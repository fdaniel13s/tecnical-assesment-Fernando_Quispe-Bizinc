const express = require('express');
const passport = require('passport');
const generateToken = require('../config/jwt');
const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        const token = generateToken(user);
        res.json({ username: user.username, token });
    })(req, res, next);
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout a user
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;