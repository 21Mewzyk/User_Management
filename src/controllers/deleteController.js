const UserAuthentication = require('../models/userAuthentication');
const UserData = require('../models/userData');

// Delete User Authentication and Data
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Delete user authentication data
        const authResult = await UserAuthentication.destroy({ where: { id: userId } });

        // Delete user profile data
        const dataResult = await UserData.destroy({ where: { id: userId } });

        if (authResult && dataResult) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { deleteUser };
