const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');

/**
 * @swagger
 * /posts/getAll:
 *   get:
 *     summary: Retrieve a list of posts
 *     responses:
 *       200:
 *         description: A list of posts
 */
router.get('/getAll', postController.getAllPosts);

router.post('/create', postController.createPost);

router.put('/update/:postId', postController.updatePost);

router.delete('/delete/:postId', postController.deletePost);

module.exports = router;