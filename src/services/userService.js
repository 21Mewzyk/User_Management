const User = require('../models/user');

module.exports = {
    registerUser: async (user) => {
        try {
            const existingUser = await User.findByPk(user.id);
            if (existingUser) {
                return { success: false, message: 'User with this ID already exists.' };
            }
            await User.create(user);
            return { success: true, message: 'User registered successfully.', userId: user.id };
        } catch (error) {
            console.error('Error registering user:', error);
            return { success: false, message: 'Error registering user.', error: error.message };
        }
    },
    deleteUser: async (id) => {
        try {
            const result = await User.destroy({ where: { id } });
            if (result) {
                return { success: true, message: 'User deleted successfully.' };
            } else {
                return { success: false, message: 'User not found.' };
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return { success: false, message: 'Failed to delete user', error: error.message };
        }
    },
    getUser: async (id) => {
        try {
            return await User.findByPk(id);
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    },
    getAllUsers: async () => {
        try {
            return await User.findAll();
        } catch (error) {
            console.error('Error getting all users:', error);
            return [];
        }
    },
    updateUser: async (id, newUser) => {
        try {
            const result = await User.update(newUser, { where: { id } });
            if (result[0]) {
                return { success: true, message: 'User updated successfully.' };
            } else {
                return { success: false, message: 'User not found.' };
            }
        } catch (error) {
            console.error('Error updating user:', error);
            return { success: false, message: 'Failed to update user', error: error.message };
        }
    }
};