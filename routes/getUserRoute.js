const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.get('/:id', (req, res) => {
    const user = userService.getUser(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json('User not found');
    }
});

module.exports = router;
