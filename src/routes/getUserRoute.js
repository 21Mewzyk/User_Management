const express = require('express');
const { getUser } = require('../controllers/getUserController'); // Correct path
const router = express.Router();

router.get('/:id', getUser);

module.exports = router;
