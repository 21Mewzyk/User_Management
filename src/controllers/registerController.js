const bcrypt = require('bcryptjs');
const UserAuthentication = require('../models/userAuthentication');
const UserData = require('../models/userData');
const { userSchema } = require('../validation/schemas');

const registerUser = async (req, res) => {
    const { id, username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;

    try {
        // Validate the input data
        await userSchema.validateAsync(req.body);

        // Check if user already exists by ID or username
        const existingUserAuth = await UserAuthentication.findOne({ where: { id } });
        const existingUsername = await UserAuthentication.findOne({ where: { username } });

        if (existingUserAuth || existingUsername) {
            return res.status(400).json({ message: 'User exists already' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user authentication record
        await UserAuthentication.create({
            id,
            username,
            password: hashedPassword,
        });

        // Create new user data record
        await UserData.create({
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
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser };
