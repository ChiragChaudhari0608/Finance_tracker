const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Income = require('../../models/Income');
const Expense = require('../../models/Expense');

// @route   GET /transactions
// @desc    Get all transactions for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).lean().exec();
    const expenses = await Expense.find({ user: req.user.id }).lean().exec();

    // Add type to each transaction
    const transactions = [
      ...incomes.map(income => ({ ...income, type: 'income' })),
      ...expenses.map(expense => ({ ...expense, type: 'expense' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
