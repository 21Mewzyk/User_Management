const express = require('express');
const {
    registerUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
} = require('../controllers/userController');
const validate = require('../middleware/validate');
const { userSchema } = require('../validation/schemas');
const normalizeInput = require('../middleware/normalizeInput');

const router = express.Router();

router.post('/register', normalizeInput, validate(userSchema), registerUser);
router.delete('/delete/:id', deleteUser);
router.get('/get/:id', getUser);
router.get('/getAll', getAllUsers);
router.put('/update/:id', normalizeInput, validate(userSchema), updateUser);

module.exports = router;
