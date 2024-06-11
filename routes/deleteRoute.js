const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.delete('/:id', (req, res) => {
    const result = userService.deleteUser(req.params.id);
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(404).json(result.message);
    }
});

module.exports = router;
