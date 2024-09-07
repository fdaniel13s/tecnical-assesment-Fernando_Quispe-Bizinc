"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/services/auth-service';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated()) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>; // Or use a spinner component
    }

    return children;
};

export default ProtectedRoute;
