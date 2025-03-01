// filepath: routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/protected
// @desc    Get protected data
// @access  Private
router.get('/', auth, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;