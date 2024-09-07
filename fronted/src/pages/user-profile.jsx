"use client";
import "../../src/app/globals.css";

import React, { useState, useEffect } from 'react';
import UserProfile from '../components/user-profile';
import ProtectedRoute from '../components/protected-route';
import { getUserIdFromToken } from '@/services/auth-service';

function UserProfilePage() {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);  // Add a loading state
    const [error, setError] = useState(null);  // Handle potential errors

    useEffect(() => {
        try {
            const id = getUserIdFromToken();
            if (id) {
                setUserId(id);
            } else {
                setError('Failed to retrieve user ID');
            }
        } catch (err) {
            setError('Error fetching user ID');
        } finally {
            setLoading(false);  // Stop loading once the user ID is retrieved
        }
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;  // Show a nicer loading state
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;  // Display error message
    }

    return (
        <ProtectedRoute>
            <UserProfile userId={userId} />
        </ProtectedRoute>
    );
}

export default UserProfilePage;
