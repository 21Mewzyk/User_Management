const bcrypt = require('bcrypt');
const User = require('../../models/user');
const logger = require('../../utils/logger');
const generateToken = require('../../utils/generateToken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate token
        const token = generateToken(user);

        // Respond with user details and token
        res.status(200).json({
            message: 'Login successful',
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
                email: user.email
            },
            token
        });
    } catch (error) {
        logger.error('Error occurred during login:', error);
        res.status(500).json({ message: 'Error logging in user.' });
    }
};

module.exports = login;
