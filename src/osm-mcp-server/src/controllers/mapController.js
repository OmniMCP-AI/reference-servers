const fetch = require('node-fetch');
const { logger } = require('../utils/logger');

const OSM_API_URL = 'https://api.openstreetmap.org/api/0.6';
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org';

exports.getTile = async (req, res) => {
  try {
    const { z, x, y } = req.params;
    const tileUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
    
    const response = await fetch(tileUrl);
    const buffer = await response.buffer();
    
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    logger.error('Error fetching tile:', error);
    res.status(500).json({ error: 'Failed to fetch tile' });
  }
};

exports.getMapInfo = async (req, res) => {
  try {
    const info = {
      name: 'OpenStreetMap',
      version: '1.0.0',
      description: 'OpenStreetMap MCP Server',
      attribution: '© OpenStreetMap contributors',
      tileFormat: 'png',
      minZoom: 0,
      maxZoom: 19
    };
    res.json(info);
  } catch (error) {
    logger.error('Error getting map info:', error);
    res.status(500).json({ error: 'Failed to get map info' });
  }
};

exports.searchLocation = async (req, res) => {
  try {
    const { q } = req.query;
    const searchUrl = `${NOMINATIM_API_URL}/search?q=${encodeURIComponent(q)}&format=json`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    logger.error('Error searching location:', error);
    res.status(500).json({ error: 'Failed to search location' });
  }
};
