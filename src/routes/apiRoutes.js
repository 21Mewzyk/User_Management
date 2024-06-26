const express = require('express');
const { getUser, getAllUsers, deleteUser, updateUser } = require('../controllers/user/index');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/get/:id', verifyToken, getUser);
router.get('/getAll', verifyToken, getAllUsers);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
});

module.exports = router;
