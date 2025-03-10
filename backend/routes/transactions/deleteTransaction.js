const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Income = require('../../models/Income');
const Expense = require('../../models/Expense');
const { deleteExpense } = require('../../controllers/expense');
const { deleteIncome } = require('../../controllers/income');

// @route   DELETE /transactions/delete-transaction/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    const expense = await Expense.findById(req.params.id);

    if (!income && !expense) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    if (income) {
      if (income.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      await Income.deleteOne({ _id: req.params.id });
    }

    if (expense) {
      if (expense.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      await Expense.deleteOne({ _id: req.params.id });
    }

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
