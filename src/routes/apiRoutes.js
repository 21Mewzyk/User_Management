const express = require('express');
const { deleteUser } = require('../controllers/deleteController');
const { getUser, getAllUsers } = require('../controllers/getUserController');
const { updateUser } = require('../controllers/updateUserController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.delete('/user/:userId', authenticateToken, deleteUser);
router.get('/user/:userId', authenticateToken, getUser);
router.get('/users', authenticateToken, getAllUsers);
router.put('/user/:userId', authenticateToken, updateUser);

router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;
