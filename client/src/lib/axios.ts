import axios from "axios";
import { BACKEND_BASE } from "../config";



const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  // Only add withCredentials for backend calls
  if (typeof config.url === 'string' && config.url.startsWith(BACKEND_BASE)) {
    config.withCredentials = true;
  } else {
    config.withCredentials = false;
  }
  return config;
});

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
