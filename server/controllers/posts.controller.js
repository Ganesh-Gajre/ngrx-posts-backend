const Post = require("../models/Post");

getPosts = (req, res) => {
    Post.findAll().then((posts) => {
        res.status(200).json(posts);
    }).catch((error) => {
        res.status(500).json({
            message: error
        });
    });
};

getPostById = (req, res) => {
    Post.findByPk(req.params.id).then((post) => {
        res.status(200).json(post);
    }).catch((error) => {
        res.status(500).json({
            message: error
        });
    });
};

addPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body
    });
    post.save().then(() => {
        res.status(200).json({
            message: 'Post added successfully!'
        });
    }).catch((error) => {
        res.status(500).json({
            message: error
        });
    });
};

updatePostById = (req, res) => {
    Post.findByPk(req.params.id).then((post) => {
        post.title = req.body.title;
        post.body = req.body.body;
        return post.save();
    }).then(() => {
        res.status(200).json({
            message: 'Post updated successfully!'
        });
    }).catch((error) => {
        res.status(500).json({
            message: error
        });
    });
};

deletePostById = (req, res) => {
    console.log(req.body);
    Post.findByPk(req.params.id).then((post) => {
        return post.destroy();
    }).then(() => {
        res.status(200).json({
            message: 'Post deleted successfully!'
        });
    }).catch((error) => {
        res.status(500).json({
            message: error
        });
    });
};

module.exports = { getPosts, getPostById, addPost, updatePostById, deletePostById }
