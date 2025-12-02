import axios from "axios";

const DB_IP_PORT = process.env.REACT_APP_DATABASE_IP_PORT ?? "";
const baseURL = DB_IP_PORT ? `http://${DB_IP_PORT}` : "";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

