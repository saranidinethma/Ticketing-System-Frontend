import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ticketing-system-backend-29o2.onrender.com';

export const configureSystem = async (config) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/config`, {
      ...config,
      maxTicketCapacity: config.maxTicketCapacity,
    });
    return response.data;
  } catch (error) {
    console.error('configureSystem error:', error);
    throw error;
  }
};

export const startSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/start`);
    return response.data;
  } catch (error) {
    console.error('startSystem error:', error);
    throw error;
  }
};

export const stopSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/stop`);
    return response.data;
  } catch (error) {
    console.error('stopSystem error:', error);
    throw error;
  }
};

export const resetSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset`);
    return response.data;
  } catch (error) {
    console.error('resetSystem error:', error);
    throw error;
  }
};

export const clearLogs = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clear-logs`);
    return response.data;
  } catch (error) {
    console.error('clearLogs error:', error);
    throw error;
  }
};

export const getStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/status`);
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return data;
  } catch (error) {
    console.error('getStatus error:', error);
    throw error;
  }
};

export const getLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;
  } catch (error) {
    console.error('getLogs error:', error);
    throw error;
  }
};
