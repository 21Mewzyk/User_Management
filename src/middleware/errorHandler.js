const { isCelebrate } = require('celebrate');

const errorHandler = (err, req, res, next) => {
    if (isCelebrate(err)) {
        return res.status(400).json({
            message: 'Validation error',
            details: err.joi.details,
        });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;
