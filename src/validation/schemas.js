const Joi = require('joi');

const userSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    occupation: Joi.string().required(),
    birthdate: Joi.date().iso().required(),
    maritalStatus: Joi.string().valid('single', 'married', 'divorced', 'widowed').required(),
    sex: Joi.string().valid('male', 'female').required(),
    email: Joi.string().email().optional()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { userSchema };
