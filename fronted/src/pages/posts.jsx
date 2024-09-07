"use client";
import "../../src/app/globals.css";

import React, { useState, useEffect } from 'react';
import { getAllPosts, createPost } from '@/services/post-service';
import { getUserIdFromToken } from '@/services/auth-service';
import PostCard from '../components/post-card';
import Toolbar from "../components/toolbar";

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);  // Loading state
    const [submitting, setSubmitting] = useState(false);  // Form submission state
    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getAllPosts();
                setPosts(postsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);  // Stop loading once the data is fetched
            }
        };

        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);  // Disable form during submission
        try {
            const newPost = { title, content, userId, published: true };
            await createPost(newPost);
            setPosts((prevPosts) => [...prevPosts, newPost]);  // Optimistic UI update
            setTitle('');
            setContent('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);  // Re-enable form after submission
        }
    };

    const handlePostUpdated = async () => {
        try {
            const postsData = await getAllPosts();
            setPosts(postsData);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <Toolbar />
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}

            {loading ? (
                <div className="text-gray-700">Cargando posts...</div>
            ) : posts.length === 0 ? (
                <div className="text-gray-700">No hay posts disponibles.</div>
            ) : (
                posts.map((post) => (
                    <PostCard key={post.id} post={post} onPostUpdated={handlePostUpdated} />
                ))
            )}

            <form onSubmit={handleSubmit} className="mt-8">
                <h2 className="text-xl font-bold mb-4">Crear un nuevo post</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        disabled={submitting}  // Disable input when submitting
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Contenido:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        disabled={submitting}  // Disable input when submitting
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={submitting}  // Disable button when submitting
                >
                    {submitting ? 'Creando Post...' : 'Crear Post'}
                </button>
            </form>
        </div>
    );
};

export default PostsPage;
