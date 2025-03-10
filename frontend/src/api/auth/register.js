import axios from 'axios';

const API_URL = 'http://localhost:3001/auth/register';

export const register = async (name, email, password) => {
  try {
    console.log('Sending register request to API:', { name, email, password });
    const response = await axios.post(API_URL, { name, email, password });
    console.log('Register API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Register API error:', error);
    throw error;
  }
};
