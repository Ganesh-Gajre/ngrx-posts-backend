const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('posts', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;