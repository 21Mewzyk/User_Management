const express = require('express');
const { getAllUsers } = require('../controllers/getAllUsersController');
const router = express.Router();

router.get('/', getAllUsers);

module.exports = router;
