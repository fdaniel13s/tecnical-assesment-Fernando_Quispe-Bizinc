const express = require('express');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Access a protected route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Unauthorized
 */
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;