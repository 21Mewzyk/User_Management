const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const apiRoutes = require('./src/routes/apiRoutes');
const logger = require('./src/utils/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use the routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
});

module.exports = app;
