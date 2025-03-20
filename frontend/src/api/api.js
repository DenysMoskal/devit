import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const userApi = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch users' };
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch user' };
    }
  },
};

export const productApi = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch products' };
    }
  },
};

export const orderApi = {
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create order' };
    }
  },

  getUserOrders: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch user orders' };
    }
  },
};
