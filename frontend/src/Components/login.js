import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      toast.error('Please enter both email and password');
      return;
    }
    
    try {
      console.log('Attempting login with:', { email });
      await login(email, password, navigate);
    } 
    catch (error) {
      console.error('Login failed:', error);
      
      // Display specific error messages based on the error response
      let errorMessage = 'Login failed. Please try again.';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.msg || 'Invalid credentials. Please check your email and password.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <LoginStyled>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </LoginStyled>
  );
};

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #fde8e8;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`;

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${props => props.theme.background || '#f0f2f5'};
  color: ${props => props.theme.color || '#333'};

  form {
    background: ${props => props.theme.cardBackground || 'white'};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    h2 {
      margin-bottom: 1rem;
      text-align: center;
      color: ${props => props.theme.color || '#333'};
    }

    div {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: ${props => props.theme.color || '#333'};
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid ${props => props.theme.cardBorder || '#ccc'};
        border-radius: 4px;
        background: ${props => props.theme.cardBackground || 'white'};
        color: ${props => props.theme.color || '#333'};
        
        &::placeholder {
          color: ${props => props.theme.mode === 'dark' ? 'rgba(240, 240, 240, 0.7)' : '#aaa'};
        }
      }
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;

      &:hover {
        background: #0056b3;
      }
    }

    p {
      margin-top: 1rem;
      text-align: center;
      color: ${props => props.theme.color || '#333'};

      a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Login;