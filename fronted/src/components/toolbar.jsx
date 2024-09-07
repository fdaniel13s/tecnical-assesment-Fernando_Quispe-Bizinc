"use client";

import React from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { isAuthenticated, logout } from '@/services/auth-service';

function Toolbar() {
    const router = useRouter(); // Initialize the router
    const handleLogout = () => {
        logout();
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <div className="bg-blue-500 p-4 flex justify-between items-center">
            <h1 className="text-white text-xl">Fernando Quispe - Technical test</h1>
            <div className="flex space-x-4">
                <Link href="/posts" className="text-white hover:text-gray-300 m-2">
                    Posts
                </Link>
                <Link href="/user-profile" className="text-white hover:text-gray-300 flex items-center ml-4">
                    <FaUser className="mr-2" /> User Profile
                </Link>
                {isAuthenticated() ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                        aria-label="Logout"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                        aria-label="Login"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Toolbar;
