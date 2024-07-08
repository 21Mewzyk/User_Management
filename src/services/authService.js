const bcrypt = require('bcrypt');
const UserAuthentication = require('../models/userAuthentication');
const logger = require('../utils/logger');

const registerUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUserAuth = await UserAuthentication.create({
            id: userData.id,
            username: userData.username,
            password: hashedPassword,
        });
        return { success: true, userId: newUserAuth.id };
    } catch (error) {
        logger.error('Error during registration:', error);
        return { success: false, message: error.message };
    }
};

const loginUser = async (username, password) => {
    try {
        const user = await UserAuthentication.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            return { success: true, user };
        }
        return { success: false, message: 'Invalid username or password' };
    } catch (error) {
        logger.error('Error during login:', error);
        return { success: false, message: error.message };
    }
};

module.exports = {
    registerUser,
    loginUser,
};
