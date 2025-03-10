const express = require('express');
const router = express.Router();
const { addIncome } = require('../../controllers/income');
const auth = require('../../middleware/auth');

// @route   POST /transactions/add-income
// @desc    Add a new income
// @access  Private
router.post('/', auth, addIncome);

module.exports = router;
