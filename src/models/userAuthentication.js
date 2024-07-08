const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserAuthentication = sequelize.define('UserAuthentication', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = UserAuthentication;
