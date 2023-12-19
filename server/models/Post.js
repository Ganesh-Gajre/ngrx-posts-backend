const { DataTypes } = require("sequelize");
const sequelize = require("../db/mysql-config");

const post = sequelize.define('Post', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { tableName: 'post' });

module.exports = post;