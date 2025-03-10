const express = require('express');
const router = express.Router();
const { deleteExpense } = require('../../controllers/expense');
const auth = require('../../middleware/auth');

// @route   DELETE /transactions/delete-expense/:id
// @desc    Delete an expense
// @access  Private
router.delete('/:id', auth, deleteExpense);

module.exports = router;
