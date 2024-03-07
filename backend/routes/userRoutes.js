// userRoutes.js
const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');
const isAdmin = require('../middleware/isAdmin');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authMiddleware, isAdmin, registerUser);
router.post('/login', loginUser);

module.exports = router;