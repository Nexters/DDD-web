import { getCookie } from "@/auth/utils/getCookie";
import axios from "axios";

const apiClient = axios.create({
  adapter: "fetch",
});

apiClient.interceptors.response.use((response) => {
  return response.data;
});

apiClient.interceptors.request.use(async (config) => {
  const userKey = await getCookie("guestId");

  config.headers["X-Guest-ID"] = userKey;

  return config;
});

export default apiClient;
