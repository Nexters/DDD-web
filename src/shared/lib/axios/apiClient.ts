import axios from 'axios';

const apiClient = axios.create({
  adapter: 'fetch',
  baseURL: process.env.API_BASE_URL,
});

export default apiClient;
