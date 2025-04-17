import axios from "axios";

const api = axios.create({
  baseURL: "https://apppesquisamarket-1.onrender.com", // ajuste conforme o backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
