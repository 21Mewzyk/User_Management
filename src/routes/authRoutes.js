const express = require('express');
const { signup, login } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { userSchema, loginSchema } = require('../validation/schemas');

const router = express.Router();

router.post('/signup', validate(userSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
