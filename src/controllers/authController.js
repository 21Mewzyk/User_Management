const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const logger = require('../utils/logger');

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Signup (Register) function
const signup = async (req, res) => {
    try {
        const { id, username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            id,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            address,
            occupation,
            birthdate,
            maritalStatus,
            sex,
            email
        });

        // Generate token
        const token = generateToken(newUser);

        // Respond with token
        res.status(201).json({ token });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            logger.error('Error occurred during signup:', error);
            res.status(500).json({ message: 'Error signing up user.' });
        }
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate token
        const token = generateToken(user);

        // Respond with token
        res.status(200).json({ token });
    } catch (error) {
        logger.error('Error occurred during login:', error);
        res.status(500).json({ message: 'Error logging in user.' });
    }
};

module.exports = { signup, login };
