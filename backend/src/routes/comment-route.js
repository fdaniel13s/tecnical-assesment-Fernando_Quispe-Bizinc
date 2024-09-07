const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment-controller');

router.get('/getAllById/:postId', commentController.getAllCommentsByPostId);
router.post('/create', commentController.createComment);
router.put('/update/:commentId', commentController.updateComment);
router.delete('/delete/:commentId', commentController.deleteComment);

module.exports = router;