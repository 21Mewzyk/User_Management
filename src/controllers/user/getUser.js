const User = require('../../models/user');
const logger = require('../../utils/logger');
const generateToken = require('../../utils/generateToken'); // Correct import

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (user) {
            const token = generateToken(user);
            res.status(200).json({
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
                token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

module.exports = getUser;
