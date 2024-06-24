require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/apiRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/utils/logger');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);
app.use('/auth', authRoutes);

sequelize.sync({ alter: true }).then(() => {
    logger.info('Database & tables created or updated!');
}).catch(error => {
    logger.error('Error syncing database:', error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
