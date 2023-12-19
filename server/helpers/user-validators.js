const JOI = require("joi");

const userSchema = JOI.object({
    username: JOI.string().min(3).max(8).required(),
    password: JOI.string().min(3).max(8).required(),
    repeat_password: JOI.ref('password')
});

validateRegister = (req, res, next) => {
    const userObj = {
        username: req.body.username,
        password: req.body.password,
        repeat_password: req.body.repeat_password,
    }
    const value = userSchema.validate(userObj);
    if (value?.error) {
        return res.status(400).json({
            message: value.error
        });
    }
    next();
};

module.exports = validateRegister;