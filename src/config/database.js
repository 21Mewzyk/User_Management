const { Sequelize } = require('sequelize');
const config = require('./dbConfig');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    dialectModule: require('mysql'),
    logging: console.log,
});

module.exports = sequelize;
