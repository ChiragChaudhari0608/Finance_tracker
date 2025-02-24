import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      axios.get('/auth/user')
        .then(response => {
          console.log('User data:', response.data);
          setUser(response.data);
        })
        .catch(() => {
          console.log('Token is invalid or expired');
          localStorage.removeItem('token');
        });
    }
  }, []);

  const register = async (name, email, password) => {
    const response = await axios.post('/auth/register', { name, email, password });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['x-auth-token'] = response.data.token;
    setUser(response.data.user);
  };

  const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['x-auth-token'] = response.data.token;
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };