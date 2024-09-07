const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

/**
 * Generates a JWT token for a given user.
 * @param {Object} user - The user object containing user details.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
    try {
        // Use environment variable for the secret key
        return jwt.sign(
            {id: user.id, username: user.username},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1h'}
        );
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};

module.exports = generateToken;