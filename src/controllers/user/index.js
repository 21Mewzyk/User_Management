const registerUser = require('./registerUser');
const login = require('./loginUser');
const getUser = require('./getUser');
const getAllUsers = require('./getAllUsers');
const deleteUser = require('./deleteUser');
const updateUser = require('./updateUser');

module.exports = {
    registerUser,
    login,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
};
