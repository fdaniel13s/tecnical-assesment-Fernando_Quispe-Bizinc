import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

/**
 * Create an Axios instance to handle HTTP requests.
 * Base URL is retrieved from environment variables for flexibility across environments.
 */
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure NEXT_PUBLIC_API_URL is correctly set in the environment variables.
});

/**
 * Function to log in the user using their username and password.
 * Stores the JWT token in localStorage upon successful login.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {object} - The response data from the API.
 * @throws {object} - The error message from the API in case of failure.
 */
export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });

        // Store the token securely in localStorage (consider expiration checks in future implementations)
        localStorage.setItem('token', response.data.token);

        return response.data; // Return the API response for further use
    } catch (error) {
        // Propagate the error message received from the API to the caller
        throw error.response.data;
    }
};

/**
 * Function to check if the user is authenticated by verifying the presence of a JWT token in localStorage.
 *
 * @returns {boolean} - True if the token exists, false otherwise.
 */
export const isAuthenticated = () => {
    if (typeof localStorage !== 'undefined') {
        return !!localStorage.getItem('token'); // Double negation to return a boolean.
    }
    return false; // Return false if localStorage is unavailable (server-side rendering scenarios)
};

/**
 * Function to extract the user ID from the stored JWT token.
 *
 * @returns {string|null} - The user ID if the token is valid, or null if the token is not found or invalid.
 */
export const getUserIdFromToken = () => {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode the JWT token
                return decodedToken.id; // Return the user ID based on the token structure (adjust if necessary)
            } catch (error) {
                console.error('Invalid token:', error); // Log if there's an issue decoding the token
            }
        }
    }
    return null; // Return null if no valid token is found
};

/**
 * Function to log out the user by removing the JWT token from localStorage.
 */
export const logout = () => {
    localStorage.removeItem('token'); // Clear the stored token from localStorage
};
