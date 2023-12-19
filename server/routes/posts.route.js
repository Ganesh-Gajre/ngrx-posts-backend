const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controller');
const userAuth = require('../middleware/auth.user');

router.route('/posts')
    .get(postController.getPosts)
    .post(postController.addPost);

router.route('/post/:id')
    .get(postController.getPostById)
    .put(postController.updatePostById)
    .delete(postController.deletePostById);

module.exports = router;