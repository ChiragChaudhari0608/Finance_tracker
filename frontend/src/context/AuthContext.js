import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { login as loginUser } from '../api/auth/login';
import { register as registerUser } from '../api/auth/register';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3001';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      axios.get('/auth/user')
        .then(response => {
          console.log('User data:', response.data);
          setUser(response.data);
          fetchTransactions(); // Fetch transactions after setting the user
        })
        .catch(() => {
          console.log('Token is invalid or expired');
          localStorage.removeItem('token');
        });
    }
  }, []);

  const register = async (name, email, password) => {
    try {
      console.log('Attempting to register user:', { name, email });
      const response = await registerUser(name, email, password);
      console.log('Registration successful:', response);
      localStorage.setItem('token', response.token);
      axios.defaults.headers.common['x-auth-token'] = response.token;
      setUser(response.user);
      fetchTransactions(); // Fetch transactions after registration
      toast.success('Registration Successful');
      navigate('/dashboard'); // Redirect to dashboard after registration
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting to login user:', { email });
      const response = await loginUser(email, password);
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token);
      axios.defaults.headers.common['x-auth-token'] = response.token;
      setUser(response.user);
      fetchTransactions(); // Fetch transactions after login
      toast.success('Login Successful');
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setTransactions([]); // Clear transactions on logout
    navigate('/login'); // Redirect to login after logout
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Fetch transactions error:', error);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post('/transactions/add-transaction', transaction);
      setTransactions([...transactions, response.data]);
      toast.success('Transaction Added Successfully');
    } catch (error) {
      console.error('Add transaction error:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/transactions/delete-transaction/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
      toast.success('Transaction Deleted Successfully');
    } catch (error) {
      console.error('Delete transaction error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, transactions, register, login, logout, fetchTransactions, addTransaction, deleteTransaction }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
