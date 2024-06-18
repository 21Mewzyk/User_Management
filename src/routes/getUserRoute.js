const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
