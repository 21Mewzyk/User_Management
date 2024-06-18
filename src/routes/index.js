const express = require('express');
const registerRoute = require('./registerRoute');
const deleteRoute = require('./deleteRoute');
const getUserRoute = require('./getUserRoute');
const getAllUsersRoute = require('./getAllUsersRoute');
const updateUserRoute = require('./updateUserRoute');

const router = express.Router();

router.use(registerRoute);
router.use(deleteRoute);
router.use(getUserRoute);
router.use(getAllUsersRoute);
router.use(updateUserRoute);

module.exports = router;
