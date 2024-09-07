const express = require('express');
const router = express.Router();

// User routes
router.use('/users', require('./user-route'));

// Post routes
router.use('/posts', require('./post-route'));

// Comment routes
router.use('/comments', require('./comment-route'));

// Authentication routes
router.use('/auth', require('./auth'));

// Protected routes
router.use('/protected', require('./protected'));

module.exports = router;