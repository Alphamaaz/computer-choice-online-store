import axios from "axios";

// Base instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token stored after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
