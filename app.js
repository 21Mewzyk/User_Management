const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./userController');
const { errors } = require('celebrate');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userController);

// Middleware for handling validation errors
app.use(errors());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
