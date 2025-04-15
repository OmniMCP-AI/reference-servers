const express = require('express');
const { getAWS } = require('../config/aws-config');
const logger = require('../utils/logger');

const router = express.Router();
const AWS = getAWS();

/**
 * List all S3 buckets
 */
router.get('/buckets', async (req, res) => {
  try {
    const s3 = new AWS.S3();
    const data = await s3.listBuckets().promise();
    res.json(data.Buckets);
  } catch (error) {
    logger.error('Error listing S3 buckets', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * List objects in a bucket
 */
router.get('/buckets/:bucket/objects', async (req, res) => {
  try {
    const s3 = new AWS.S3();
    const data = await s3.listObjects({
      Bucket: req.params.bucket,
      Prefix: req.query.prefix || ''
    }).promise();
    res.json(data.Contents);
  } catch (error) {
    logger.error(`Error listing objects in bucket ${req.params.bucket}`, error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Upload an object to a bucket
 */
router.post('/buckets/:bucket/objects', async (req, res) => {
  try {
    if (!req.body.key || !req.body.content) {
      return res.status(400).json({ error: 'Missing required parameters: key and content' });
    }

    const s3 = new AWS.S3();
    const data = await s3.putObject({
      Bucket: req.params.bucket,
      Key: req.body.key,
      Body: req.body.content,
      ContentType: req.body.contentType || 'application/octet-stream'
    }).promise();
    
    res.status(201).json({
      message: 'Object uploaded successfully',
      etag: data.ETag
    });
  } catch (error) {
    logger.error(`Error uploading object to bucket ${req.params.bucket}`, error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete an object from a bucket
 */
router.delete('/buckets/:bucket/objects/:key(*)', async (req, res) => {
  try {
    const s3 = new AWS.S3();
    await s3.deleteObject({
      Bucket: req.params.bucket,
      Key: req.params.key
    }).promise();
    
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting object ${req.params.key} from bucket ${req.params.bucket}`, error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
