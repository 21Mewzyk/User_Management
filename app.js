const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');


const deleteUserRoute = require('./src/routes/deleteRoute');
const getUserRoute = require('./src/routes/getUserRoute');
const getAllUsersRoute = require('./src/routes/getAllUsersRoute');
const updateUserRoute = require('./src/routes/updateUserRoute');
const registerRoute = require('./src/routes/registerRoute');

const app = express();

app.use(bodyParser.json());

app.use('/users', registerRoute);
app.use('/users', deleteUserRoute);
app.use('/users', getUserRoute);
app.use('/users', getAllUsersRoute);
app.use('/users', updateUserRoute);

app.use(errors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
