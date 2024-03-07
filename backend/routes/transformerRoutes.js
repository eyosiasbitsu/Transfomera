
// transformerRoutes.js
const express = require('express');
const router = express.Router();
const Transformer = require('../models/Transformer');
const { getTechnicianTransformers, registerTransformer, getTransformerById, deleteTransformerById, updateTransformerById, getTransformers} = require('../controllers/transformerController');

const authMiddleware = require('../middleware/authMiddleware');

// Route to get list of assigned transformers
router.get('/technician', authMiddleware, getTechnicianTransformers);
router.post('/', authMiddleware, registerTransformer);
router.get('/:id', authMiddleware, getTransformerById);
router.delete('/:id', authMiddleware, deleteTransformerById);
router.put('/:id', authMiddleware, updateTransformerById);
router.get('/', authMiddleware, getTransformers)
module.exports = router;
