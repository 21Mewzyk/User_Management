const Joi = require('joi');

const userSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    occupation: Joi.string().required(),
    birthdate: Joi.date().required(),
    maritalStatus: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').required(),
    sex: Joi.string().valid('Male', 'Female').required(),
    email: Joi.string().email().optional()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = { userSchema, loginSchema };
