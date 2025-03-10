const express = require('express');
const router = express.Router();

router.use('/add-expense', require('./transactions/addExpense'));
router.use('/get-expenses', require('./transactions/getExpenses'));
router.use('/delete-expense', require('./transactions/deleteExpense'));
router.use('/add-income', require('./transactions/addIncome'));
router.use('/get-incomes', require('./transactions/getIncomes'));
router.use('/delete-income', require('./transactions/deleteIncome'));
router.use('/', require('./transactions/getTransactions'));
router.use('/add-transaction', require('./transactions/addTransaction'));
router.use('/delete-transaction', require('./transactions/deleteTransaction'));

module.exports = router;