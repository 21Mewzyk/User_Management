const UserData = require('../models/userData');
// Get User Data
const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserData.findByPk(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await UserData.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getUser, getAllUsers };
