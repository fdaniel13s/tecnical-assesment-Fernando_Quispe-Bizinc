"use client";
import React, { useState } from "react";
import TodoItem from "@/components/todo-item"; // Ensure correct import path

function TodoList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Make the components', completed: true },
        { id: 2, text: 'Apply good styles', completed: false }
    ]);

    const [text, setText] = useState('');

    function addTask(text) {
        if (text.trim() === '') return; // Avoid adding empty tasks
        const newTask = { id: Date.now(), text, completed: false };
        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addTask(text);
        }
    }

    return (
        <div className="todo-list flex justify-center mt-10">
            <div className="bg-white p-6 rounded shadow-md">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="mb-2 p-2 border rounded placeholder-gray-500 text-black"
                    placeholder="Introduce a task"
                    onKeyDown={handleKeyDown} // Changed to onKeyDown
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={() => addTask(text)}
                >
                    Add
                </button>
                {tasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoList;
