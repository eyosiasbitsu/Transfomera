// src/api/authService.js
import axios from 'axios';

const API_URL = 'https://transfomera.onrender.com/api/users/';

// Function to login a user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Handle or throw the error depending on your error handling strategy
    console.error("Error:", error);
    // Properly forwarding the error for the caller (e.g., LoginPage component) to handle
    throw error;
  }
};
