const Income = require('../models/Income');

// @desc    Add a new income
// @route   POST /transactions/add-income
// @access  Private
exports.addIncome = async (req, res) => {
  const { text, amount, date, category, description } = req.body;

  try {
    console.log('Adding income:', { text, amount, date, category, description, user: req.user.id }); // Add logging
    const newIncome = new Income({
      text,
      amount,
      date,
      category,
      description,
      user: req.user.id
    });

    const income = await newIncome.save();
    res.json(income);
  } catch (err) {
    console.error('Error adding income:', err.message); // Add logging
    console.error('Error stack:', err.stack); // Add detailed logging
    res.status(500).send('Server error');
  }
};

// @desc    Get all incomes for the logged-in user
// @route   GET /transactions/get-incomes
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
// @route   DELETE /transactions/delete-income/:id
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

    await Income.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Income removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};