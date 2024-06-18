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

module.exports = { registerUser };
