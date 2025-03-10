import axios from 'axios';

const API_URL = 'http://localhost:3001/auth/login';

export const login = async (email, password) => {
  try {
    console.log('Sending login request to API:', { email, password });
    const response = await axios.post(API_URL, { email, password });
    console.log('Login API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
