const express = require('express');
const router = express.Router();
const { getTile, getMapInfo, searchLocation } = require('../controllers/mapController');

// Get map tile
router.get('/tile/:z/:x/:y', getTile);

// Get map information
router.get('/info', getMapInfo);

// Search location
router.get('/search', searchLocation);

module.exports = router;
