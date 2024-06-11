const userData = require('../userData');

module.exports = {
    registerUser: (user) => {
        return userData.addUser(user);
    },
    deleteUser: (id) => {
        return userData.deleteUser(id);
    },
    getUser: (id) => {
        return userData.getUser(id);
    },
    getAllUsers: () => {
        return userData.getAllUsers();
    },
    updateUser: (id, newUser) => {
        return userData.updateUser(id, newUser);
    }
};
