const express = require('express');
const { getAWS } = require('../config/aws-config');
const logger = require('../utils/logger');

const router = express.Router();
const AWS = getAWS();

/**
 * List all EC2 instances
 */
router.get('/instances', async (req, res) => {
  try {
    const ec2 = new AWS.EC2();
    const data = await ec2.describeInstances().promise();
    
    // Extract instance information from the response
    const instances = [];
    data.Reservations.forEach(reservation => {
      reservation.Instances.forEach(instance => {
        instances.push({
          instanceId: instance.InstanceId,
          instanceType: instance.InstanceType,
          state: instance.State.Name,
          publicDnsName: instance.PublicDnsName,
          publicIpAddress: instance.PublicIpAddress,
          privateIpAddress: instance.PrivateIpAddress,
          launchTime: instance.LaunchTime,
          tags: instance.Tags
        });
      });
    });
    
    res.json(instances);
  } catch (error) {
    logger.error('Error listing EC2 instances', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Start an EC2 instance
 */
router.post('/instances/:instanceId/start', async (req, res) => {
  try {
    const ec2 = new AWS.EC2();
    await ec2.startInstances({
      InstanceIds: [req.params.instanceId]
    }).promise();
    
    res.json({ message: `Instance ${req.params.instanceId} starting` });
  } catch (error) {
    logger.error(`Error starting EC2 instance ${req.params.instanceId}`, error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Stop an EC2 instance
 */
router.post('/instances/:instanceId/stop', async (req, res) => {
  try {
    const ec2 = new AWS.EC2();
    await ec2.stopInstances({
      InstanceIds: [req.params.instanceId]
    }).promise();
    
    res.json({ message: `Instance ${req.params.instanceId} stopping` });
  } catch (error) {
    logger.error(`Error stopping EC2 instance ${req.params.instanceId}`, error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get EC2 instance details
 */
router.get('/instances/:instanceId', async (req, res) => {
  try {
    const ec2 = new AWS.EC2();
    const data = await ec2.describeInstances({
      InstanceIds: [req.params.instanceId]
    }).promise();
    
    if (data.Reservations.length === 0 || data.Reservations[0].Instances.length === 0) {
      return res.status(404).json({ error: `Instance ${req.params.instanceId} not found` });
    }
    
    const instance = data.Reservations[0].Instances[0];
    res.json({
      instanceId: instance.InstanceId,
      instanceType: instance.InstanceType,
      state: instance.State.Name,
      publicDnsName: instance.PublicDnsName,
      publicIpAddress: instance.PublicIpAddress,
      privateIpAddress: instance.PrivateIpAddress,
      launchTime: instance.LaunchTime,
      tags: instance.Tags,
      securityGroups: instance.SecurityGroups,
      vpcId: instance.VpcId,
      subnetId: instance.SubnetId,
      imageId: instance.ImageId
    });
  } catch (error) {
    logger.error(`Error getting EC2 instance ${req.params.instanceId} details`, error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
