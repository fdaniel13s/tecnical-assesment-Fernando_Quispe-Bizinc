import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createUser = async (data) => {
    try {
        const response = await api.post('/users/create', data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const getUser = async (id) => {
    try {
        const response = await api.get(`/users/getById/${id}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await api.put(`/users/update/${id}`, data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/delete/${id}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

// Centralized error handler
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
