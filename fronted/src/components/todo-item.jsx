import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
    const handleChange = () => {
        toggleCompleted(task.id);
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <div className="todo-item bg-gray-600 mb-2 flex items-center justify-between rounded-md p-5">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
                className="mr-2"
                aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
            />
            <p className="flex-grow text-center font-serif">{task.text}</p>
            <button
                onClick={handleDelete}
                className="ml-2 bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition duration-200"
                aria-label={`Delete ${task.text}`}
            >
                X
            </button>
        </div>
    );
}

export default TodoItem;
