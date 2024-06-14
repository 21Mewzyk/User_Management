const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

// Define database connection parameters
const dbName = 'user_management';
const dbUser = 'root';
const dbPassword = 'ryan';
const dbHost = 'localhost';

// Create the database if it doesn't exist
async function createDatabase() {
    const connection = await mysql.createConnection({ host: dbHost, user: dbUser, password: dbPassword });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
}

// Call the function to create the database
createDatabase().then(() => {
    console.log(`Database ${dbName} created or already exists.`);
}).catch(err => {
    console.error('Error creating database:', err);
});

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});

module.exports = sequelize;
