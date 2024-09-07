const db = require('../models/db');

/**
 * Get all published posts
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAllPosts = async (req, res) => {
    try {
        // Fetch all posts where the post is published
        const posts = await db.Post.findAll(
            { where: { published: true } }
        );
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Create a new post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createPost = async (req, res) => {
    try {
        // Create a new post with the provided data
        const post = await db.Post.create({
            title: req.body.title,
            content: req.body.content,
            published: req.body.published,
            userId: req.body.userId,
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Update an existing post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updatePost = async (req, res) => {
    try {
        // Update the post with the provided data
        const post = await db.Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                userId: req.body.userId,
            },
            {
                where: { id: req.params.postId },
            }
        );
        res.status(200).json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Delete (unpublish) a post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deletePost = async (req, res) => {
    try {
        // Mark the post as unpublished
        await db.Post.update(
            { published: false },
            { where: { id: req.params.postId } }
        );
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};