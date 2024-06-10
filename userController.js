const express = require('express');
const userService = require('./userService');
const { celebrate, Joi, errors, Segments } = require('celebrate');
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
    const result = userService.registerUser(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message, userId: result.userId });
    } else {
        res.status(400).json(result.message);
    }
});

router.delete('/:id', (req, res) => {
    const result = userService.deleteUser(req.params.id);
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(404).json(result.message);
    }
});

router.get('/:id', (req, res) => {
    const user = userService.getUser(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json('User not found');
    }
});

router.get('/', (req, res) => {
    const users = userService.getAllUsers();
    res.status(200).json(users);
});

router.put('/:id', celebrate({ [Segments.BODY]: userSchema }), (req, res) => {
    const result = userService.updateUser(req.params.id, req.body);
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(404).json(result.message);
    }
});

// Add middleware to handle validation errors
router.use(errors());

module.exports = router;
