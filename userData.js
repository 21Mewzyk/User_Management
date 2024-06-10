let users = [];

const addUser = (user) => {
    users.push(user);
};

const removeUserById = (id) => {
    users = users.filter(user => user.id !== id);
};

const getUserById = (id) => {
    return users.find(user => user.id === id);
};

const getAllUsers = () => {
    return users;
};

const updateUserById = (id, updatedInfo) => {
    users = users.map(user => user.id === id ? { ...user, ...updatedInfo } : user);
};

module.exports = {
    addUser,
    removeUserById,
    getUserById,
    getAllUsers,
    updateUserById
};
