const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.get('/', (req, res) => {
    const users = userService.getAllUsers();
    res.status(200).json(users);
});

module.exports = router;
