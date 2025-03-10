const express = require('express');
const router = express.Router();

router.use('/add-expense', require('./addExpense'));
router.use('/get-expenses', require('./getExpenses'));
router.use('/delete-expense/:id', require('./deleteExpense'));
router.use('/add-income', require('./addIncome'));
router.use('/get-incomes', require('./getIncomes'));
router.use('/delete-income/:id', require('./deleteIncome'));
router.use('/', require('./getTransactions'));
router.use('/add-transaction', require('./addTransaction'));
router.use('/delete-transaction/:id', require('./deleteTransaction'));

module.exports = router;
