"use client";

import React from 'react';
import TodoList from './todo-list';

function Home() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center" aria-label="Todo List Title">Todo List</h2>
            <TodoList /> {/* Render the component */}
        </div>
    );
}

export default React.memo(Home);
