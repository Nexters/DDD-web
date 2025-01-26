import axios from 'axios';

const apiClient = axios.create({
  adapter: 'fetch',
});

export default apiClient;
