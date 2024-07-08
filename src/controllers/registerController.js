const bcrypt = require('bcrypt');
const UserAuthentication = require('../models/userAuthentication');
const UserData = require('../models/userData');

// Register User Authentication and Data
const registerUser = async (req, res) => {
    const { id, username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserAuth = await UserAuthentication.create({
            id,
            username,
            password: hashedPassword,
        });
        const newUserData = await UserData.create({
            id,
            firstName,
            lastName,
            address,
            occupation,
            birthdate,
            maritalStatus,
            sex,
            email,
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser };
