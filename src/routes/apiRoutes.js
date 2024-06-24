const express = require('express');
const {
    registerUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} = require('../controllers/userController'); 
const validate = require('../middleware/validate');
const { userSchema } = require('../validation/schemas');
const normalizeInput = require('../middleware/normalizeInput');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/register', normalizeInput, validate(userSchema), registerUser);
router.delete('/delete/:id', authenticate, deleteUser);
router.get('/get/:id', authenticate, getUser);
router.get('/getAll', authenticate, getAllUsers);
router.put('/update/:id', normalizeInput, validate(userSchema), authenticate, updateUser);

module.exports = router;
