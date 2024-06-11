const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { errors } = require('celebrate');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', routes);

app.use(errors());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
