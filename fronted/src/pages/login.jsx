"use client";
import "../../src/app/globals.css";

import React from 'react';
import Login from '../components/login';

function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Login />
        </div>
    );
}

export default LoginPage;