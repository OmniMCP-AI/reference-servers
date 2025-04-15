const express = require('express');
const { getAWS } = require('../config/aws-config');
const logger = require('../utils/logger');

const router = express.Router();
const AWS = getAWS();

/**
 * List all Lambda functions
 */
router.get('/functions', async (req, res) => {
  try {
    const lambda = new AWS.Lambda();
    const data = await lambda.listFunctions().promise();
    res.json(data.Functions);
  } catch (error) {
    logger.error('Error listing Lambda functions', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Lambda function details
 */
router.get('/functions/:functionName', async (req, res) => {
  try {
    const lambda = new AWS.Lambda();
    const data = await lambda.getFunction({
      FunctionName: req.params.functionName
    }).promise();
    res.json(data);
  } catch (error) {
    logger.error(`Error getting Lambda function ${req.params.functionName} details`, error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Invoke a Lambda function
 */
router.post('/functions/:functionName/invoke', async (req, res) => {
  try {
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: req.params.functionName,
      InvocationType: req.body.invocationType || 'RequestResponse', // 'RequestResponse' or 'Event'
      LogType: req.body.logType || 'None', // 'None' or 'Tail'
      Payload: JSON.stringify(req.body.payload || {})
    };
    
    const data = await lambda.invoke(params).promise();
    
    // Parse the payload if it's a string
    let responsePayload = data.Payload;
    try {
      responsePayload = JSON.parse(data.Payload);
    } catch (e) {
      // If it's not valid JSON, keep it as is
    }
    
    res.json({
      statusCode: data.StatusCode,
      executedVersion: data.ExecutedVersion,
      payload: responsePayload,
      logResult: data.LogResult ? Buffer.from(data.LogResult, 'base64').toString() : null
    });
  } catch (error) {
    logger.error(`Error invoking Lambda function ${req.params.functionName}`, error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update Lambda function configuration
 */
router.patch('/functions/:functionName/configuration', async (req, res) => {
  try {
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: req.params.functionName,
      ...req.body
    };
    
    const data = await lambda.updateFunctionConfiguration(params).promise();
    res.json(data);
  } catch (error) {
    logger.error(`Error updating Lambda function ${req.params.functionName} configuration`, error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
