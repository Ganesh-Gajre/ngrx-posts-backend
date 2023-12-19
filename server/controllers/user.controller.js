const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

exports.signIn = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.dataValues.password).then(() => {
                const token = jwt.sign({
                    id: user.dataValues.id,
                    username: user.dataValues.username
                }, 'my_secret_key', { expiresIn: '1h' });
                res.status(200).json({
                    message: 'User successfully logged in!',
                    token,
                    user: {
                        id: user.dataValues.id,
                        username: user.dataValues.username
                    }
                });
            }).catch((error) => {
                res.status(400).json({
                    message: 'Username or password is incorrect!'
                });
            });
        } else {
            res.status(400).json({
                message: 'User not exist!'
            });
        }
    }).catch((error) => {
        res.status(400).json({
            message: error
        });
    });
};

exports.signUp = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (user) {
            res.status(403).json({
                message: 'This username is already in use!'
            });
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new User({
                    id: uuid.v4(),
                    username: req.body.username,
                    password: hash
                });
                user.save().then(() => {
                    res.status(200).json({
                        message: "User registered successfully!"
                    });
                }).catch((error) => {
                    res.status(500).json({
                        message: error
                    });
                });
            }).catch((error) => {
                res.status(500).json({
                    message: error
                });
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
};