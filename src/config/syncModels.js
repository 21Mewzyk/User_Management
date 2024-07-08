const sequelize = require('./database');
const UserAuthentication = require('../models/userAuthentication');
const UserData = require('../models/userData');

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models with the database
        await sequelize.sync({ force: true }); // Use force: true only in development
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncModels();
