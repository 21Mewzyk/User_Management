const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const userService = require('../services/userService');

const router = express.Router();

const userSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    occupation: Joi.string().required(),
    birthdate: Joi.date().iso().required(),
    maritalStatus: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').required(),
    sex: Joi.string().valid('Male', 'Female', 'Other').required()
});

router.post('/register', celebrate({ [Segments.BODY]: userSchema }), (req, res) => {
    try {
        const result = userService.registerUser(req.body);
        if (result && result.success) {
            res.status(201).json({ message: result.message, userId: result.userId });
        } else if (result) {
            res.status(400).json({ message: result.message });
        } else {
            res.status(500).json({ message: 'Internal server error.' });
        }
    } catch (error) {
        console.error('Error occurred during registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
