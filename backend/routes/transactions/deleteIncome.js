const express = require('express');
const router = express.Router();
const { deleteIncome } = require('../../controllers/income');
const auth = require('../../middleware/auth');

// @route   DELETE /transactions/delete-income/:id
// @desc    Delete an income
// @access  Private
router.delete('/:id', auth, deleteIncome);

module.exports = router;
