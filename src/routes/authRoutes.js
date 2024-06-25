const express = require('express');
const { signup, login } = require('../controllers/authController'); // Correct import
const validate = require('../middleware/validate');
const { userSchema, loginSchema } = require('../validation/schemas');

const router = express.Router();

router.post('/signup', validate(userSchema), signup); // Ensure functions are defined
router.post('/login', validate(loginSchema), login);  // Ensure functions are defined

module.exports = router;
