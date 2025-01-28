import axios from "axios";

const apiClient = axios.create({
  adapter: "fetch",
  withCredentials: true,
});

apiClient.interceptors.response.use((response) => {
  return response.data;
});

export default apiClient;
