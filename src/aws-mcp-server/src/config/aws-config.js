const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const os = require('os');
const logger = require('../utils/logger');

/**
 * Configure AWS SDK with credentials
 * This function tries to load AWS credentials in the following order:
 * 1. From environment variables
 * 2. From AWS credentials file
 * 3. From AWS config file
 * 4. From EC2 instance metadata (if running on EC2)
 */
function configureAWS() {
  // Check if credentials are provided via environment variables
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    logger.info('Using AWS credentials from environment variables');
    const config = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-west-2'
    };

    // Add session token if provided (needed for temporary credentials)
    if (process.env.AWS_SESSION_TOKEN) {
      config.sessionToken = process.env.AWS_SESSION_TOKEN;
    }

    AWS.config.update(config);
    return;
  }

  // Check if profile is specified
  const profile = process.env.AWS_PROFILE || 'default';

  // Try to load from shared credentials file (~/.aws/credentials)
  try {
    const credentialsPath = path.join(os.homedir(), '.aws', 'credentials');
    if (fs.existsSync(credentialsPath)) {
      logger.info(`Loading AWS credentials from shared credentials file using profile: ${profile}`);
      AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile });
      AWS.config.update({
        region: process.env.AWS_REGION || 'us-west-2'
      });
      return;
    }
  } catch (error) {
    logger.warn('Error loading AWS credentials from shared credentials file', error);
  }

  // If no credentials found, AWS SDK will attempt to use instance metadata service if running on EC2
  logger.info('No explicit AWS credentials found. AWS SDK will use default credential provider chain');
  AWS.config.update({
    region: process.env.AWS_REGION || 'us-west-2'
  });
}

/**
 * Get AWS SDK instance with the configured credentials
 * @returns {AWS.SDK} AWS SDK instance
 */
function getAWS() {
  return AWS;
}

module.exports = {
  configureAWS,
  getAWS
};
