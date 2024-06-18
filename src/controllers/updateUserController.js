const userService = require('../services/userService');

const updateUser = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.id, req.body);
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(404).json(result.message);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { updateUser };
