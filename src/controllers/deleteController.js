const userService = require('../services/userService');

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { deleteUser };
