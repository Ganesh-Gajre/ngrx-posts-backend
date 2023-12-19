const jwt = require('jsonwebtoken');

userAuth = (req, res, next) => {
    if (req?.headers?.authorization) {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'my_secret_key');
        req.userData = decoded;
    } else {
        return res.status(400).json({
            message: "Your session is not valid!"
        });
    }
    next();
}

module.exports = userAuth;