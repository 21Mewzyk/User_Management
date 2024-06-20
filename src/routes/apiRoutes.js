const express = require('express');
const { registerUser } = require('../controllers/registerController');
const { deleteUser } = require('../controllers/deleteController');
const { getAllUsers } = require('../controllers/getAllUsersController');
const { getUser } = require('../controllers/getUserController');
const { updateUser } = require('../controllers/updateUserController');
const { userSchema } = require('../validation/schemas');
const validate = require('../middleware/validate');
const normalizeInput = require('../middleware/normalizeInput');

const router = express.Router();

router.post('/register', normalizeInput, validate(userSchema), registerUser);
router.delete('/delete/:id', deleteUser);
router.get('/get/:id', getUser);
router.get('/getAll', getAllUsers);
router.put('/update/:id', normalizeInput, validate(userSchema), updateUser);

module.exports = router;
