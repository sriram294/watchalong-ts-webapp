import axios from "axios";
import { BACKEND_BASE } from "../config";

// Utility to get JWT token from localStorage
function getJwtToken() {
  return localStorage.getItem("jwt_token");
}

const axiosInstance = axios.create();

// Add JWT Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = getJwtToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Optional: Redirect to login on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
