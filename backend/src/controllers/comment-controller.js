const db = require('../models/db');

/**
 * Get all comments by a specific post id and if is published
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAllCommentsByPostId = async (req, res) => {
    try {
        // Fetch all comments for a specific post ID where the comment is published
        const comments = await db.Comment.findAll({
            where: {
                postId: req.params.postId,
                published: true,
            },
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Create a new comment
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createComment = async (req, res) => {
    try {
        // Create a new comment with the provided data
        const comment = await db.Comment.create({
            content: req.body.content,
            published: req.body.published,
            userId: req.body.userId,
            postId: req.body.postId,
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Update an existing comment
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateComment = async (req, res) => {
    try {
        // Update the comment with the provided data
        const comment = await db.Comment.update(
            {
                content: req.body.content,
                published: req.body.published,
                userId: req.body.userId,
                postId: req.body.postId,
            },
            {
                where: { id: req.params.commentId },
            }
        );
        res.status(200).json(comment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Delete (unpublish) a comment
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteComment = async (req, res) => {
    try {
        // Mark the comment as unpublished by convention. Always don't delete data.
        await db.Comment.update({
            published: false,
        }, {
            where: { id: req.params.commentId },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}