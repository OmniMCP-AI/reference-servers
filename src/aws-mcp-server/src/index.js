const express = require('express');
const dotenv = require('dotenv');
const { configureAWS } = require('./config/aws-config');
const logger = require('./utils/logger');
const s3Routes = require('./services/s3');
const ec2Routes = require('./services/ec2');
const lambdaRoutes = require('./services/lambda');

// Load environment variables
dotenv.config();

// Initialize AWS SDK
configureAWS();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/s3', s3Routes);
app.use('/api/ec2', ec2Routes);
app.use('/api/lambda', lambdaRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  logger.info(`AWS MCP Server listening on port ${port}`);
});
