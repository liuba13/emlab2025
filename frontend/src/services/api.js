import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiService = {
  // Отримати всі станції
  getStations: async () => {
    try {
      const response = await api.get('/stations');
      return response.data;
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  },

  // Отримати останні вимірювання
  getLatestMeasurements: async () => {
    try {
      const response = await api.get('/measurements/latest');
      return response.data;
    } catch (error) {
      console.error('Error fetching measurements:', error);
      throw error;
    }
  },

  // Отримати всі вимірювання
  getMeasurements: async (params = {}) => {
    try {
      const response = await api.get('/measurements', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching all measurements:', error);
      throw error;
    }
  },

  // Синхронізація з SaveEcoBot
  syncSaveEcoBot: async () => {
    try {
      const response = await api.get('/saveecobot/sync');
      return response.data;
    } catch (error) {
      console.error('Error syncing SaveEcoBot:', error);
      throw error;
    }
  },

  // Перевірка здоров'я системи
  getHealth: async () => {
    try {
      const response = await axios.get('http://localhost:3000/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
};

export default apiService;