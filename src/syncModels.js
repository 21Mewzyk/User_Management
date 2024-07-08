const sequelize = require('./config/database'); // Correct path to the database configuration
const UserAuthentication = require('./models/userAuthentication'); // Correct path to the models
const UserData = require('./models/userData'); // Correct path to the models

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models with the database
        await sequelize.sync({ force: false }); // Set force to false to avoid dropping other tables
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncModels();
