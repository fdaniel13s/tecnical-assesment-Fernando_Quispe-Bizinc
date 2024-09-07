import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createComment = async (data) => {
    try {
        const response = await api.post('/comments/create', data);
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

export const getAllCommentsByPostId = async (postId) => {
    try {
        const response = await api.get(`/comments/getAllById/${postId}`);
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

export const updateComment = async (id, data) => {
    try {
        const response = await api.put(`/comments/update/${id}`, data);
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

export const deleteComment = async (id) => {
    try {
        const response = await api.delete(`/comments/delete/${id}`);
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

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
        console.error('Error', error.message);
        return { message: error.message };
    }
};
