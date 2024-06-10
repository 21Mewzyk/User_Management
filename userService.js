const { v4: uuidv4 } = require('uuid');
const userData = require('./userData');

const registerUser = (user) => {
    if (userData.getUserById(user.id)) {
        return { success: false, message: 'User ID already exists' };
    }
    user.uuid = uuidv4();  // Generate UUID and assign it to user.uuid
    userData.addUser(user);
    return { success: true, message: 'User registered successfully', userId: user.id };
};

const deleteUser = (id) => {
    if (!userData.getUserById(id)) {
        return { success: false, message: 'User not found' };
    }
    userData.removeUserById(id);
    return { success: true, message: 'User deleted successfully' };
};

const getUser = (id) => {
    return userData.getUserById(id);
};

const getAllUsers = () => {
    return userData.getAllUsers();
};

const updateUser = (id, updatedInfo) => {
    if (!userData.getUserById(id)) {
        return { success: false, message: 'User not found' };
    }
    userData.updateUserById(id, updatedInfo);
    return { success: true, message: 'User updated successfully' };
};

module.exports = {
    registerUser,
    deleteUser,
    getUser,
    getAllUsers,
    updateUser
};
