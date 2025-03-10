const express = require('express');
const router = express.Router();
const { addExpense } = require('../../controllers/expense');
const auth = require('../../middleware/auth');

// @route   POST /transactions/add-expense
// @desc    Add a new expense
// @access  Private
router.post('/', auth, addExpense);

module.exports = router;
