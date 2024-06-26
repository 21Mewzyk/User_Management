const jwt = require('jsonwebtoken');
const moment = require('moment');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        decoded.iat = moment.unix(decoded.iat).format('YYYY-MM-DD HH:mm:ss');
        decoded.exp = moment.unix(decoded.exp).format('YYYY-MM-DD HH:mm:ss');
        
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
