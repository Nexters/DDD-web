import { createUserKeyCookie } from "@/auth/utils/createUserKeyCookie";
import axios from "axios";

const apiClient = axios.create({
  adapter: "fetch",
});

apiClient.interceptors.response.use((response) => {
  return response.data;
});

apiClient.interceptors.request.use(async (config) => {
  // TODO: 쿠키 추가 방식 변경
  const userKey = await createUserKeyCookie();

  config.headers["X-Guest-ID"] = userKey;

  return config;
});

export default apiClient;
