
// transformerRoutes.js
const express = require('express');
const router = express.Router();
const { getSensors } = require('../controllers/sensorController');

// Route to get list of assigned transformers
router.get('/:id', getSensors);
module.exports = router;
