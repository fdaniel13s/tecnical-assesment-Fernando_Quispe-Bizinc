import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createPost = async (data) => {
    try {
        const response = await api.post('/posts/create', data);
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

export const getAllPosts = async () => {
    try {
        const response = await api.get('/posts/getAll');
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

export const updatePost = async (id, data) => {
    try {
        const response = await api.put(`/posts/update/${id}`, data);
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/posts/delete/${id}`);
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

// Common error handler
const handleError = (error) => {
    if (error.response) {
        // Request made and server responded
        console.error('Error response:', error.response.data);
        return error.response.data;
    } else if (error.request) {
        // Request made but no response received
        console.error('Error request:', error.request);
        return { message: 'No response from server' };
    } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
        return { message: error.message };
    }
};
