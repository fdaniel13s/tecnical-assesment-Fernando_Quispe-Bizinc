"use client";
import "../../src/app/globals.css";

import React, { useState } from 'react';
import { updateComment, deleteComment } from '@/services/comment-service';
import { getUserIdFromToken } from '@/services/auth-service';

const Comment = ({ comment, onCommentUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [error, setError] = useState(null);
    const userId = getUserIdFromToken();

    const handleEdit = async () => {
        setError(null); // Reset error before new action
        try {
            const updatedComment = { content: editedContent, userId };
            await updateComment(comment.id, updatedComment);
            setIsEditing(false);
            onCommentUpdated();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar el comentario');
        }
    };

    const handleDelete = async () => {
        setError(null); // Reset error before new action
        try {
            await deleteComment(comment.id);
            onCommentUpdated();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar el comentario');
        }
    };

    return (
        <div className="bg-white p-2 rounded-lg shadow-md mb-2 text-sm">
            {isEditing ? (
                <>
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-2"
                        aria-label="Edit comment"
                    />
                    <button
                        onClick={handleEdit}
                        className="w-full bg-blue-400 text-white py-1 rounded-lg hover:bg-blue-500 transition duration-200 mb-1"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="w-full bg-gray-400 text-white py-1 rounded-lg hover:bg-gray-500 transition duration-200"
                    >
                        Cancelar
                    </button>
                </>
            ) : (
                <>
                    <p className="text-gray-700">{comment.content}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-yellow-400 text-white py-1 rounded-lg hover:bg-yellow-500 transition duration-200 mb-1"
                        aria-label="Edit comment button"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full bg-red-400 text-white py-1 rounded-lg hover:bg-red-500 transition duration-200"
                        aria-label="Delete comment button"
                    >
                        Eliminar
                    </button>
                </>
            )}
            {error && <div className="text-red-500 mt-2">Error: {error}</div>}
        </div>
    );
};

export default Comment;
