const express = require('express');
const router = express.Router();
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// @route   POST /api/v1/transactions/add-expense
// @desc    Add a new expense
// @access  Private
router.post('/add-expense', auth, addExpense);

// @route   GET /api/v1/transactions/get-expenses
// @desc    Get all expenses for the logged-in user
// @access  Private
router.get('/get-expenses', auth, getExpense);

// @route   DELETE /api/v1/transactions/delete-expense/:id
// @desc    Delete an expense
// @access  Private
router.delete('/delete-expense/:id', auth, deleteExpense);

// @route   POST /api/v1/transactions/add-income
// @desc    Add a new income
// @access  Private
router.post('/add-income', auth, addIncome);

// @route   GET /api/v1/transactions/get-incomes
// @desc    Get all incomes for the logged-in user
// @access  Private
router.get('/get-incomes', auth, getIncomes);

// @route   DELETE /api/v1/transactions/delete-income/:id
// @desc    Delete an income
// @access  Private
router.delete('/delete-income/:id', auth, deleteIncome);

// @route   GET /api/v1/transactions
// @desc    Get all transactions for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/v1/transactions
// @desc    Add a new transaction
// @access  Private
router.post('/', auth, async (req, res) => {
  const { text, amount } = req.body;

  try {
    const newTransaction = new Transaction({
      text,
      amount,
      user: req.user.id
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/v1/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await transaction.remove();

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;