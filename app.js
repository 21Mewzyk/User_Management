require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const routes = require('./src/routes');
const { errors } = require('celebrate');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync().then(() => {
    console.log('Database & tables created!');
}).catch(error => {
    console.error('Error syncing database:', error);
});

app.use(errors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
