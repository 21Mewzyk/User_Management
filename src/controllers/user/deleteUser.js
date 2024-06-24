const User = require('../../models/user');
const logger = require('../../utils/logger');

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.destroy({ where: { id: userId } });
        if (result) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

module.exports = deleteUser;
