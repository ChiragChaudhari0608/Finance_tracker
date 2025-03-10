const express = require('express');
const router = express.Router();

router.use('/login', require('./auth/login'));
router.use('/register', require('./auth/register'));
router.use('/user', require('./auth/user')); // Add this line

module.exports = router;