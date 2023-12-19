const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validateRegister = require('../helpers/user-validators');

router.route('/sign-in')
    .post(userController.signIn);

router.route('/sign-up')
    .post(validateRegister, userController.signUp);

module.exports = router;