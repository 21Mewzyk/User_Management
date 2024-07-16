const express = require('express');
const { registerUser } = require('../controllers/registerController');
const { loginUser } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { userSchema, loginSchema } = require('../validation/schemas');

const router = express.Router();

router.post('/register', validate(userSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;
