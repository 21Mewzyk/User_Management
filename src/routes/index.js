const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const { registerUser } = require('../controllers/registerController');
const { deleteUser } = require('../controllers/deleteController');
const { getAllUsers } = require('../controllers/getAllUsersController');
const { getUser } = require('../controllers/getUserController');
const { updateUser } = require('../controllers/updateUserController');

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

router.post('/register', celebrate({ [Segments.BODY]: userSchema }), registerUser);
router.delete('/delete/:id', deleteUser);
router.get('/get/:id', getUser);
router.get('/getAll', getAllUsers);
router.put('/update/:id', celebrate({ [Segments.BODY]: userSchema }), updateUser);

module.exports = router;
