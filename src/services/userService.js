const UserData = require('../models/userData');
const logger = require('../utils/logger');

const createUser = async (userData) => {
    try {
        const newUser = await UserData.create(userData);
        return { success: true, userId: newUser.id };
    } catch (error) {
        logger.error('Error creating user:', error);
        return { success: false, message: error.message };
    }
};

const getUser = async (userId) => {
    try {
        const user = await UserData.findByPk(userId);
        return user ? { success: true, user } : { success: false, message: 'User not found' };
    } catch (error) {
        logger.error('Error fetching user:', error);
        return { success: false, message: error.message };
    }
};

const updateUser = async (userId, newData) => {
    try {
        const user = await UserData.findByPk(userId);
        if (user) {
            await user.update(newData);
            return { success: true, message: 'User updated successfully' };
        }
        return { success: false, message: 'User not found' };
    } catch (error) {
        logger.error('Error updating user:', error);
        return { success: false, message: error.message };
    }
};

const deleteUser = async (userId) => {
    try {
        const result = await UserData.destroy({ where: { id: userId } });
        return result ? { success: true, message: 'User deleted successfully' } : { success: false, message: 'User not found' };
    } catch (error) {
        logger.error('Error deleting user:', error);
        return { success: false, message: error.message };
    }
};

const getAllUsers = async () => {
    try {
        const users = await UserData.findAll();
        return users;
    } catch (error) {
        logger.error('Error fetching users:', error);
        throw error;
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
};
