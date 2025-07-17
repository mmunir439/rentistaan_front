// src/lib/axios.js
import axios from "axios";
import { getToken } from "@/utils/token"; // <-- import the token getter

const api = axios.create({
  baseURL: "http://10.140.2.124:5000",
  withCredentials: false, // only use true if you're using cookies
});

// Add Authorization header to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // get the stored token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
