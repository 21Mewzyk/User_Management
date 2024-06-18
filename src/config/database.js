const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const dbName = 'user_management';
const dbUser = 'root';
const dbPassword = 'ryan';
const dbHost = 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});

module.exports = sequelize;
