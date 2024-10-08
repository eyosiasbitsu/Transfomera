
// transformerRoutes.js
const express = require('express');
const router = express.Router();
const Transformer = require('../models/Transformer');
const { registerTransformer, getTransformerById, deleteTransformerById, updateTransformerById, getTransformers, addSensorData} = require('../controllers/transformerController');

const authMiddleware = require('../middleware/authMiddleware');

// Route to get list of assigned transformers
router.post('/:id', addSensorData);
router.post('/', authMiddleware, registerTransformer);
router.get('/:id', authMiddleware, getTransformerById);
router.delete('/:id', authMiddleware, deleteTransformerById);
router.put('/:id',  updateTransformerById);
router.get('/', authMiddleware, getTransformers);
module.exports = router;

