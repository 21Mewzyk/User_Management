const User = require('../../models/user');
const logger = require('../../utils/logger');
const generateToken = require('../../utils/generateToken'); // Correct import

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const usersWithTokens = users.map(user => ({
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                occupation: user.occupation,
                birthdate: user.birthdate,
                maritalStatus: user.maritalStatus,
                sex: user.sex,
                email: user.email,
            },
            token: generateToken(user)
        }));
        res.status(200).json(usersWithTokens);
    } catch (error) {
        logger.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

module.exports = getAllUsers;
