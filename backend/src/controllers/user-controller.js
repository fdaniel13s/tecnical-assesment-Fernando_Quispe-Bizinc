const db = require('../models/db');
const bcrypt = require('bcrypt');

/**
 * Get all users
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await db.User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created successfully
 */
/**
 * Create a new user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({ username, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Update an existing user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        // Find the user by primary key
        const user = await db.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Hash the password before updating
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.update({ username, email, password: hashedPassword });
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Delete a user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the user by primary key
        const user = await db.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Get a user by ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the user by primary key
        const user = await db.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}