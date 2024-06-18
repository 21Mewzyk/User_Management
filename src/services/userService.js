const User = require('../models/user')

const registerUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return { success: true, message: 'User registered successfully', userId: user.id };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'Failed to register user' };
    }
};

const deleteUser = async (id) => {
    try {
        const result = await User.destroy({ where: { id } });
        if (result) {
            return { success: true, message: 'User deleted successfully' };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, message: 'Failed to delete user' };
    }
};

const getUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error('Error getting all users:', error);
        return [];
    }
};

const updateUser = async (id, userData) => {
    try {
        const [updated] = await User.update(userData, { where: { id } });
        if (updated) {
            return { success: true, message: 'User updated successfully' };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, message: 'Failed to update user' };
    }
};

module.exports = {
    registerUser,
    deleteUser,
    getUser,
    getAllUsers,
    updateUser
};
