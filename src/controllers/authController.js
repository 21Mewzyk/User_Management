const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const logger = require('../utils/logger');
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const signup = async (req, res) => {
    try {
        const { id, username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

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

        const token = generateToken(newUser);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            logger.error('Error occurred during signup:', error);
            res.status(500).json({ message: 'Error signing up user.' });
        }
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid or missing token' });
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            occupation: user.occupation,
            birthdate: user.birthdate,
            maritalStatus: user.maritalStatus,
            sex: user.sex,
            email: user.email
        });
    } catch (error) {
        logger.error('Error occurred during login:', error);
        res.status(500).json({ message: 'Error logging in user.' });
    }
};

module.exports = { signup, login };
