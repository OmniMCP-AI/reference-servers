const { getAWS } = require('../config/aws-config');
const logger = require('./logger');

/**
 * Session Manager for AWS connections
 * Manages AWS sessions for different profiles and regions
 */
class SessionManager {
  constructor() {
    this.sessions = new Map();
    this.AWS = getAWS();
  }

  /**
   * Get or create a session for a specific profile and region
   * @param {string} profile - AWS profile name
   * @param {string} region - AWS region
   * @returns {Object} AWS session
   */
  getSession(profile = 'default', region = process.env.AWS_REGION || 'us-west-2') {
    const sessionKey = `${profile}:${region}`;
    
    if (this.sessions.has(sessionKey)) {
      return this.sessions.get(sessionKey);
    }
    
    try {
      // Create a new AWS config for this session
      const config = {
        credentials: new this.AWS.SharedIniFileCredentials({ profile }),
        region: region
      };
      
      // Store the session
      this.sessions.set(sessionKey, config);
      logger.info(`Created new AWS session for profile: ${profile}, region: ${region}`);
      
      return config;
    } catch (error) {
      logger.error(`Failed to create AWS session for profile: ${profile}, region: ${region}`, error);
      throw error;
    }
  }
  
  /**
   * Create a service client with the specified session
   * @param {string} serviceClass - AWS service class name (e.g., 'S3', 'EC2')
   * @param {string} profile - AWS profile name
   * @param {string} region - AWS region
   * @returns {Object} AWS service client
   */
  createServiceClient(serviceClass, profile = 'default', region = process.env.AWS_REGION || 'us-west-2') {
    const session = this.getSession(profile, region);
    return new this.AWS[serviceClass](session);
  }
  
  /**
   * Clear a specific session
   * @param {string} profile - AWS profile name
   * @param {string} region - AWS region
   */
  clearSession(profile = 'default', region = process.env.AWS_REGION || 'us-west-2') {
    const sessionKey = `${profile}:${region}`;
    if (this.sessions.has(sessionKey)) {
      this.sessions.delete(sessionKey);
      logger.info(`Cleared AWS session for profile: ${profile}, region: ${region}`);
    }
  }
  
  /**
   * Clear all sessions
   */
  clearAllSessions() {
    this.sessions.clear();
    logger.info('Cleared all AWS sessions');
  }
}

// Export a singleton instance
module.exports = new SessionManager();
