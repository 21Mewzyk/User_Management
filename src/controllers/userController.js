const userService = require('../services/userService');
const logger = require('../utils/logger');

const registerUser = async (req, res, next) => {
    try {
        const result = await userService.registerUser(req.body);
        if (result.success) {
            res.status(201).json({ message: result.message, userId: result.userId });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        logger.error('Error occurred during registration:', error);
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(404).json(result.message);
        }
    } catch (error) {
        logger.error('Error occurred during deletion:', error);
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        logger.error('Error occurred while fetching all users:', error);
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        logger.error('Error occurred while fetching user:', error);
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const result = await userService.updateUser(req.params.id, req.body);
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(404).json(result.message);
        }
    } catch (error) {
        logger.error('Error occurred during update:', error);
        next(error);
    }
};

module.exports = {
    registerUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
};
