// src/lib/axios.js
import axios from "axios";
import { getToken } from "@/utils/token"; // <-- import the token getter

const api = axios.create({
  baseURL: "http://localhost:5000/", // Your backend base
  withCredentials: true, // optional, only if you use cookies
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
