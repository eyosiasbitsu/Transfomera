// userRoutes.js
const express = require('express');
const router = express.Router();

const { registerUser, loginUser, userDetail, passwordReset } = require('../controllers/userController');
const isAdmin = require('../middleware/isAdmin');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authMiddleware, isAdmin, registerUser);
router.post('/login', loginUser);
router.get('/:id', userDetail);
router.put('/:id', passwordReset);

module.exports = router;