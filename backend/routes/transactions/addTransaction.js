const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transaction = require('../../models/Transaction');

// @route   POST /transactions/add-transaction
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

module.exports = router;
