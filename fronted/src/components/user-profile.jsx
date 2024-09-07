"use client";
import "../../src/app/globals.css";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, deleteUser } from '@/services/user-service';
import { logout } from '@/services/auth-service';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId);
                setUser(userData);
            } catch (err) {
                setError(err.message);
            }
        };

        if (typeof window !== 'undefined') {
            fetchUser();
        }
    }, [router, userId]);

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
            router.push('/'); // Redirect to home page after deletion
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = () => {
        router.push(`/edit-user/${userId}`); // Redirect to edit user page
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login'); // Redirect to login page after logout
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-black">
            <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}!</h1>
            <p className="text-gray-700 mb-6">{user.email}</p>
            <div className="flex space-x-4">
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Editar Cuenta
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Eliminar Cuenta
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;