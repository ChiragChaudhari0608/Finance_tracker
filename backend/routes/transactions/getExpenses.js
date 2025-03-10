const express = require('express');
const router = express.Router();
const { getExpense } = require('../../controllers/expense');
const auth = require('../../middleware/auth');

// @route   GET /transactions/get-expenses
// @desc    Get all expenses for the logged-in user
// @access  Private
router.get('/', auth, getExpense);

module.exports = router;
