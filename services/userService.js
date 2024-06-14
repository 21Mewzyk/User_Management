const User = require('../models/user');

module.exports = {
    registerUser: async (user) => {
        try {
            const existingUser = await User.findOne({ where: { id: user.id } });
            if (existingUser) {
                return { success: false, message: 'User with this ID already exists.' };
            }
            await User.create(user);
            return { success: true, message: 'User registered successfully.', userId: user.id };
        } catch (error) {
            console.error('Error registering user:', error);
            return { success: false, message: 'Internal server error.' };
        }
    },
    deleteUser: async (id) => {
        try {
            const result = await User.destroy({ where: { id } });
            if (result) {
                return { success: true, message: 'User deleted successfully.' };
            }
            return { success: false, message: 'User not found.' };
        } catch (error) {
            console.error('Error deleting user:', error);
            return { success: false, message: 'Internal server error.' };
        }
    },
    getUser: async (id) => {
        try {
            const user = await User.findOne({ where: { id } });
            return user ? user.toJSON() : null;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    },
    getAllUsers: async () => {
        try {
            const users = await User.findAll();
            return users.map(user => user.toJSON());
        } catch (error) {
            console.error('Error fetching all users:', error);
            return [];
        }
    },
    updateUser: async (id, newUser) => {
        try {
            const result = await User.update(newUser, { where: { id } });
            if (result[0]) {
                return { success: true, message: 'User updated successfully.' };
            }
            return { success: false, message: 'User not found.' };
        } catch (error) {
            console.error('Error updating user:', error);
            return { success: false, message: 'Internal server error.' };
        }
    }
};
