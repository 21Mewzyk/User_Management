const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        if (result && result.success) {
            res.status(201).json({ message: result.message, userId: result.userId });
        } else if (result) {
            res.status(400).json({ message: result.message, error: result.error });
        } else {
            res.status(500).json({ message: 'Internal server error.' });
        }
    } catch (error) {
        console.error('Error occurred during registration:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};

module.exports = { registerUser };
