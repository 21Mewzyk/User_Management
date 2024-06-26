const bcrypt = require('bcrypt');
const User = require('../../models/user');
const logger = require('../../utils/logger');

const registerUser = async (req, res) => {
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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            logger.error('Error occurred during signup:', error);
            res.status(500).json({ message: 'Error signing up user.' });
        }
    }
};

module.exports = registerUser;
