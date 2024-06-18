const express = require('express');
const registerRoute = require('./registerRoute');
const deleteRoute = require('./deleteRoute');
const getUserRoute = require('./getUserRoute');
const getAllUsersRoute = require('./getAllUsersRoute');
const updateUserRoute = require('./updateUserRoute');

const router = express.Router();

router.use('/register', registerRoute);
router.use('/delete', deleteRoute);
router.use('/get', getUserRoute); // Correct path
router.use('/getAll', getAllUsersRoute);
router.use('/update', updateUserRoute);

module.exports = router;
