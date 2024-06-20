const normalizeInput = (req, res, next) => {
    if (req.body.maritalStatus) {
        req.body.maritalStatus = req.body.maritalStatus.toLowerCase();
    }
    if (req.body.sex) {
        req.body.sex = req.body.sex.toLowerCase();
    }
    next();
};

module.exports = normalizeInput;
