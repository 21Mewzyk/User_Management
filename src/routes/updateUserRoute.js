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

router.put('/:id', celebrate({ [Segments.BODY]: userSchema }), (req, res) => {
    const result = userService.updateUser(req.params.id, req.body);
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(404).json(result.message);
    }
});

module.exports = router;
