import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = '/api';

// Feedback API calls
export const feedbackAPI = {
  // Submit new feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all feedback
  getAllFeedback: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/feedback`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Simple auth simulation (since we don't have auth backend yet)
export const authAPI = {
  login: async (username, password) => {
    // Simulate login - in real app this would call backend
    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username, name: username }));
      return { success: true, user: { username, name: username } };
    }
    throw new Error('Invalid credentials');
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
