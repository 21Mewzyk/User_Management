const sequelize = require('./config/database'); 
const UserAuthentication = require('./models/userAuthentication'); 
const UserData = require('./models/userData'); 

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncModels();
