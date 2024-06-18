const { CelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CelebrateError) {
        const validationError = err.details.get('body') || err.details.get('query') || err.details.get('params');
        const message = validationError ? validationError.message : 'Validation error';
        return res.status(400).json({
            message: 'Invalid input. Must be single, married, widowed, or divorced only',
            details: message,
        });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;
