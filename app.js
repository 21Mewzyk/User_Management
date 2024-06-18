require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/apiRoutes'); // Updated to apiRoutes
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/utils/logger');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync().then(() => {
    logger.info('Database & tables created!');
}).catch(error => {
    logger.error('Error syncing database:', error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
