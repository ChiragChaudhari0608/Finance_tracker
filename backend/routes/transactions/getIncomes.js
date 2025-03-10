const express = require('express');
const router = express.Router();
const { getIncomes } = require('../../controllers/income');
const auth = require('../../middleware/auth');

// @route   GET /transactions/get-incomes
// @desc    Get all incomes for the logged-in user
// @access  Private
router.get('/', auth, getIncomes);

module.exports = router;
