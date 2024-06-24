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
        const { id, username, password, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ id, username, password: hashedPassword, firstName, lastName });
        const token = generateToken(newUser);
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

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        logger.error('Error occurred during login:', error);
        res.status(500).json({ message: 'Error logging in user.' });
    }
};

module.exports = { signup, login };
