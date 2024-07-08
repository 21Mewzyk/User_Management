const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuthentication = require('../models/userAuthentication');
const UserData = require('../models/userData');

// User Login
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserAuthentication.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            const userData = await UserData.findOne({ where: { id: user.id } });
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

            const decodedToken = jwt.decode(token);
            const issuedAt = new Date(decodedToken.iat * 1000).toISOString();
            const expiration = new Date(decodedToken.exp * 1000).toISOString();

            res.status(200).json({
                message: 'Login successful',
                firstName: userData.firstName,
                lastName: userData.lastName,
                token: token,
                issuedAt: issuedAt,
                expiration: expiration
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { loginUser };
