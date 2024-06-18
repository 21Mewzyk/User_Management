const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const { registerUser } = require('../controllers/registerController'); // Correct path

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

router.post('/', celebrate({ [Segments.BODY]: userSchema }), registerUser);

module.exports = router;
