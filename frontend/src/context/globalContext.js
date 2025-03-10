import React, { useContext, useState, useCallback } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = "http://localhost:3001/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [lastDeletedItem, setLastDeletedItem] = useState(null);

  // Calculate incomes
  const addIncome = async (income) => {
    try {
      console.log('Adding income:', income); // Add logging
      const response = await axios.post(`${BASE_URL}transactions/add-income`, income);
      console.log('Income added:', response.data); // Add logging
      getIncomes();
      getTransactions(); // Fetch transactions after adding income
      toast.success('Income added successfully!');
    } catch (err) {
      console.error('Error adding income:', err.response ? err.response.data : err.message); // Add logging
      setError(err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : 'Error adding income');
    }
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}transactions/get-incomes`);
    setIncomes(response.data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort incomes by date in descending order
    console.log(response.data);
  };

  // Using useCallback to ensure function identity is preserved
  const restoreDeletedIncome = useCallback(async () => {
    if (!lastDeletedItem || lastDeletedItem.type !== 'income') {
      console.log('Cannot restore: Invalid item', lastDeletedItem);
      return;
    }
    
    try {
      console.log('Restoring income:', lastDeletedItem);
      const { _id, text, amount, date, category, description } = lastDeletedItem;
      // Create a new income object without the _id
      const incomeToRestore = { 
        text, 
        amount, 
        date: typeof date === 'string' ? date : date.toISOString(), 
        category, 
        description 
      };
      
      console.log('Income to restore:', incomeToRestore);
      const response = await axios.post(`${BASE_URL}transactions/add-income`, incomeToRestore);
      console.log('Income restore response:', response.data);
      getIncomes();
      getTransactions();
      setLastDeletedItem(null);
      toast.success('Income restored successfully!');
    } catch (err) {
      console.error('Error restoring income:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : 'Error restoring income');
    }
  }, [lastDeletedItem]);

  const deleteIncome = async (id) => {
    try {
      console.log(`Deleting income with id: ${id}`); // Add logging
      
      // Find the income to be deleted and store it
      const incomeToDelete = incomes.find(income => income._id === id);
      if (incomeToDelete) {
        // Store a deep copy with the type property
        setLastDeletedItem(JSON.parse(JSON.stringify({ ...incomeToDelete, type: 'income' })));
      }
      
      await axios.delete(`${BASE_URL}transactions/delete-income/${id}`);
      getIncomes();
      getTransactions(); // Fetch transactions after deleting income
      
      // Show toast with undo button
      toast.success(
        <div className="toast-message">
          Income deleted successfully!
          <button 
            onClick={() => {
              console.log('Undo button clicked for income');
              restoreDeletedIncome();
            }} 
            className="undo-button"
          >
            UNDO
          </button>
        </div>,
        {
          autoClose: 5000,
          closeOnClick: false
        }
      );
    } catch (err) {
      console.error('Error deleting income:', err.response ? err.response.data : err.message); // Add logging
      setError(err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : 'Error deleting income');
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  // Calculate expenses
  const addExpense = async (expense) => {
    try {
      console.log('Adding expense:', expense); // Add logging
      const response = await axios.post(`${BASE_URL}transactions/add-expense`, expense);
      console.log('Expense added:', response.data); // Add logging
      getExpenses();
      getTransactions(); // Fetch transactions after adding expense
      toast.success('Expense added successfully!');
    } catch (err) {
      console.error('Error adding expense:', err.response ? err.response.data : err.message); // Add logging
      setError(err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : 'Error adding expense');
    }
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}transactions/get-expenses`);
    setExpenses(response.data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort expenses by date in descending order
    console.log(response.data);
  };

  // Using useCallback to ensure function identity is preserved
  const restoreDeletedExpense = useCallback(async () => {
    if (!lastDeletedItem || lastDeletedItem.type !== 'expense') {
      console.log('Cannot restore: Invalid item', lastDeletedItem);
      return;
    }
    
    try {
      console.log('Restoring expense:', lastDeletedItem);
      const { _id, text, amount, date, category, description } = lastDeletedItem;
      // Create a new expense object without the _id
      const expenseToRestore = { 
        text, 
        amount, 
        date: typeof date === 'string' ? date : date.toISOString(), 
        category, 
        description 
      };
      
      console.log('Expense to restore:', expenseToRestore);
      const response = await axios.post(`${BASE_URL}transactions/add-expense`, expenseToRestore);
      console.log('Expense restore response:', response.data);
      getExpenses();
      getTransactions();
      setLastDeletedItem(null);
      toast.success('Expense restored successfully!');
    } catch (err) {
      console.error('Error restoring expense:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : 'Error restoring expense');
    }
  }, [lastDeletedItem]);

  const deleteExpense = async (id) => {
    try {
      console.log(`Deleting expense with id: ${id}`); // Add logging
      
      // Find the expense to be deleted and store it
      const expenseToDelete = expenses.find(expense => expense._id === id);
      if (expenseToDelete) {
        // Store a deep copy with the type property
        setLastDeletedItem(JSON.parse(JSON.stringify({ ...expenseToDelete, type: 'expense' })));
      }
      
      await axios.delete(`${BASE_URL}transactions/delete-expense/${id}`);
      getExpenses();
      getTransactions(); // Fetch transactions after deleting expense
      
      // Show toast with undo button
      toast.success(
        <div className="toast-message">
          Expense deleted successfully!
          <button 
            onClick={() => {
              console.log('Undo button clicked for expense');
              restoreDeletedExpense();
            }} 
            className="undo-button"
          >
            UNDO
          </button>
        </div>,
        {
          autoClose: 5000,
          closeOnClick: false
        }
      );
    } catch (err) {
      console.error('Error deleting expense:', err.response ? err.response.data : err.message); // Add logging
      setError(err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : 'Error deleting expense');
    }
  };

  const totalExpenses = () => {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      totalExpenses = totalExpenses + expense.amount;
    });

    return totalExpenses;
  };

  // Fetch transactions
  const getTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}transactions`);
      setTransactions(response.data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort transactions by date in descending order
      console.log('Transactions fetched:', response.data); // Add logging
    } catch (err) {
      console.error('Error fetching transactions:', err.response ? err.response.data : err.message); // Add logging
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  // Using useCallback to ensure function identity is preserved  
  const restoreDeletedTransaction = useCallback(async () => {
    if (!lastDeletedItem) {
      console.log('Cannot restore transaction: No deleted item found');
      return;
    }
    
    console.log('Attempting to restore transaction:', lastDeletedItem);
    
    try {
      if (lastDeletedItem.type === 'income') {
        console.log('Restoring income transaction');
        await restoreDeletedIncome();
      } else if (lastDeletedItem.type === 'expense') {
        console.log('Restoring expense transaction');
        await restoreDeletedExpense();
      } else {
        console.log('Unknown transaction type:', lastDeletedItem.type);
        
        // Try to determine the type from other properties
        if (lastDeletedItem.hasOwnProperty('income')) {
          console.log('Detected as income from properties');
          const { text, amount, date, category, description } = lastDeletedItem;
          const incomeToRestore = { 
            text, 
            amount, 
            date: typeof date === 'string' ? date : date.toISOString(), 
            category, 
            description 
          };
          await axios.post(`${BASE_URL}transactions/add-income`, incomeToRestore);
          getIncomes();
          getTransactions();
          toast.success('Transaction restored successfully!');
        } else {
          console.log('Assuming expense type');
          const { text, amount, date, category, description } = lastDeletedItem;
          const expenseToRestore = { 
            text, 
            amount, 
            date: typeof date === 'string' ? date : date.toISOString(), 
            category, 
            description 
          };
          await axios.post(`${BASE_URL}transactions/add-expense`, expenseToRestore);
          getExpenses();
          getTransactions();
          toast.success('Transaction restored successfully!');
        }
      }
      
      setLastDeletedItem(null);
    } catch (err) {
      console.error('Error restoring transaction:', err);
      toast.error('Error restoring transaction. Please try again.');
    }
  }, [lastDeletedItem, restoreDeletedIncome, restoreDeletedExpense]);

  const deleteTransaction = async (id) => {
    try {
      console.log(`Deleting transaction with id: ${id}`); // Add logging
      
      // Find the transaction to be deleted and store it
      const transactionToDelete = transactions.find(transaction => transaction._id === id);
      if (transactionToDelete) {
        // Store a deep copy
        setLastDeletedItem(JSON.parse(JSON.stringify(transactionToDelete)));
      }
      
      await axios.delete(`${BASE_URL}transactions/delete-transaction/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
      getIncomes(); // Fetch incomes after deleting transaction
      getExpenses(); // Fetch expenses after deleting transaction
      console.log('Transaction deleted:', id); // Add logging
      
      // Show toast with undo button
      toast.success(
        <div className="toast-message">
          Transaction deleted successfully!
          <button 
            onClick={() => {
              console.log('Undo button clicked for transaction');
              restoreDeletedTransaction();
            }} 
            className="undo-button"
          >
            UNDO
          </button>
        </div>,
        {
          autoClose: 5000,
          closeOnClick: false
        }
      );
    } catch (err) {
      console.error('Error deleting transaction:', err.response ? err.response.data : err.message); // Add logging
      setError(err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : 'Error deleting transaction');
    }
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider value={{
      addIncome,
      getIncomes,
      incomes,
      deleteIncome,
      restoreDeletedIncome,
      expenses,
      totalIncome,
      addExpense,
      getExpenses,
      deleteExpense,
      restoreDeletedExpense,
      totalExpenses,
      totalBalance,
      transactionHistory,
      transactions,
      getTransactions,
      deleteTransaction,
      restoreDeletedTransaction,
      error,
      setError
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};