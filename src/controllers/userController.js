const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Register user function (if needed)
const registerUser = async (req, res) => {
    // Registration logic here...
};

// Delete user by ID function
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.destroy({ where: { id: userId } });
        if (result) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

// Get user by ID function
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (user) {
            const token = generateToken(user);
            res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    occupation: user.occupation,
                    birthdate: user.birthdate,
                    maritalStatus: user.maritalStatus,
                    sex: user.sex,
                    email: user.email,
                },
                token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// Get all users function
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const usersWithTokens = users.map(user => ({
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                occupation: user.occupation,
                birthdate: user.birthdate,
                maritalStatus: user.maritalStatus,
                sex: user.sex,
                email: user.email,
            },
            token: generateToken(user)
        }));
        res.status(200).json(usersWithTokens);
    } catch (error) {
        logger.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

// Update user by ID function
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;
        const user = await User.findByPk(userId);
        if (user) {
            user.username = username;
            user.password = await bcrypt.hash(password, 10); // Hash the new password
            user.firstName = firstName;
            user.lastName = lastName;
            user.address = address;
            user.occupation = occupation;
            user.birthdate = birthdate;
            user.maritalStatus = maritalStatus;
            user.sex = sex;
            user.email = email;
            await user.save();
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

module.exports = {
    registerUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
};
