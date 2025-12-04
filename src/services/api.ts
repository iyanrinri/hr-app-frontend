import axios from "axios";
import { getAuthToken, clearAuth } from "@/store/authStore";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth();
      // Optionally redirect to login here or handle in UI
    }
    return Promise.reject(err);
  }
);

export default api;
