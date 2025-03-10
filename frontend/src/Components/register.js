import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }
    
    // Password strength validation
    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      toast.error('Password should be at least 6 characters long');
      return;
    }
    
    try {
      console.log('Attempting registration with:', { name, email });
      await register(name, email, password, navigate);
    } catch (error) {
      console.error('Registration failed:', error);
      
      // Display specific error messages based on the error response
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response) {
        if (error.response.status === 400) {
          // Check for specific error messages from the server
          if (error.response.data.msg) {
            errorMessage = error.response.data.msg;
          } else if (error.response.data.errors && error.response.data.errors.length > 0) {
            errorMessage = error.response.data.errors[0].msg;
          }
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
    <RegisterStyled>
      <form onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div>
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Enter your name"
          />
        </div>
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
            placeholder="Create a password"
          />
          <PasswordHint>Password should be at least 6 characters long</PasswordHint>
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </RegisterStyled>
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

const PasswordHint = styled.small`
  display: block;
  color: #666;
  margin-top: 4px;
  font-size: 12px;
`;

const RegisterStyled = styled.div`
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

export default Register;