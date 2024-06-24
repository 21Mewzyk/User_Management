const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    maritalStatus: {
        type: DataTypes.ENUM('Single', 'Married', 'Divorced', 'Widowed'),
        allowNull: false,
    },
    sex: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false,
});

module.exports = User;
