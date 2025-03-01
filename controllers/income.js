const Income = require('../models/Income');

// @desc    Add a new income
// @route   POST /api/v1/transactions/add-income
// @access  Private
exports.addIncome = async (req, res) => {
  const { text, amount } = req.body;

  try {
    const newIncome = new Income({
      text,
      amount,
      user: req.user.id
    });

    const income = await newIncome.save();
    res.json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all incomes for the logged-in user
// @route   GET /api/v1/transactions/get-incomes
// @access  Private
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.json(incomes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete an income
// @route   DELETE /api/v1/transactions/delete-income/:id
// @access  Private
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ msg: 'Income not found' });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await income.remove();

    res.json({ msg: 'Income removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};