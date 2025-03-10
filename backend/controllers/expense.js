const Expense = require('../models/Expense');

// @desc    Add a new expense
// @route   POST /transactions/add-expense
// @access  Private
exports.addExpense = async (req, res) => {
  const { text, amount, date, category, description } = req.body;

  try {
    console.log('Adding expense:', { text, amount, date, category, description, user: req.user.id }); // Add logging
    const newExpense = new Expense({
      text,
      amount,
      date,
      category,
      description,
      user: req.user.id
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error('Error adding expense:', err.message); // Add logging
    console.error('Error stack:', err.stack); // Add detailed logging
    res.status(500).send('Server error');
  }
};

// @desc    Get all expenses for the logged-in user
// @route   GET /transactions/get-expenses
// @access  Private
exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete an expense
// @route   DELETE /transactions/delete-expense/:id
// @access  Private
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Expense.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};