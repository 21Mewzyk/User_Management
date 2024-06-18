const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_management', 'root', 'ryan', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
});

module.exports = sequelize;
