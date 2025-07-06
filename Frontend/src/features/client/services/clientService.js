/*import axios from 'axios';

const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;

export const getUserData = async (userId, token) => {
  try {
    const response = await axios.get(`${API_GATEWAY}/get-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};*/

// clientService.js (solo para pruebas locales)
const API_BASE = "http://localhost:3002/api/users";

export const getUserInfo = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/${userId}`);
    if (!response.ok) throw new Error("Error getting user info");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};
