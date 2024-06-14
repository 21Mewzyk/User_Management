const users = [];

module.exports = {
    addUser: (user) => {
        if (users.find(u => u.id === user.id)) {
            return { success: false, message: 'User with this ID already exists.' };
        }
        users.push(user);
        return { success: true, message: 'User registered successfully.', userId: user.id };
    },
    deleteUser: (id) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            return { success: true, message: 'User deleted successfully.' };
        }
        return { success: false, message: 'User not found.' };
    },
    getUser: (id) => {
        return users.find(user => user.id === id);
    },
    getAllUsers: () => {
        return users;
    },
    updateUser: (id, newUser) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = newUser;
            return { success: true, message: 'User updated successfully.' };
        }
        return { success: false, message: 'User not found.' };
    }
};
