"use client";
import "../../src/app/globals.css";

import React, { useState, useEffect } from 'react';
import { getAllCommentsByPostId, createComment } from '@/services/comment-service';
import { updatePost, deletePost } from '@/services/post-service';
import { getUserIdFromToken } from '@/services/auth-service';
import Comment from './comment';

const PostCard = ({ post, onPostUpdated }) => {
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedContent, setEditedContent] = useState(post.content);
    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getAllCommentsByPostId(post.id);
                setComments(Array.isArray(commentsData) ? commentsData : []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchComments();
    }, [post.id]);

    const updateComments = async () => {
        try {
            const commentsData = await getAllCommentsByPostId(post.id);
            setComments(Array.isArray(commentsData) ? commentsData : []);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const newComment = { content: commentContent, postId: post.id, userId, published: true };
            await createComment(newComment);
            setCommentContent('');
            await updateComments();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = async () => {
        try {
            const updatedPost = { title: editedTitle, content: editedContent, userId };
            await updatePost(post.id, updatedPost);
            setIsEditing(false);
            onPostUpdated();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(post.id);
            onPostUpdated();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-amber-200 p-4 rounded-lg shadow-md mb-4">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-2"
                        aria-label="Edit Post Title"
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-2"
                        aria-label="Edit Post Content"
                    />
                    <button
                        onClick={handleEdit}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-2"
                        aria-label="Save Changes"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                        aria-label="Cancel Edit"
                    >
                        Cancelar
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-2 text-black">{post.title}</h2>
                    <p className="text-gray-700">{post.content}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200 mb-2"
                        aria-label="Edit Post"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        aria-label="Delete Post"
                    >
                        Eliminar
                    </button>
                </>
            )}
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}
            {comments.length === 0 ? (
                <div className="text-gray-700">No hay comentarios disponibles.</div>
            ) : (
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} onCommentUpdated={updateComments} />
                ))
            )}
            <form onSubmit={handleCommentSubmit} className="mt-4">
                <div className="mb-2">
                    <label htmlFor="commentContent" className="block text-gray-700 text-sm font-bold mb-1">Nuevo Comentario:</label>
                    <textarea
                        id="commentContent"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        aria-label="New Comment Content"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    aria-label="Submit Comment"
                >
                    Crear Comentario
                </button>
            </form>
        </div>
    );
};

export default PostCard;
