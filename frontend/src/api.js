import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  // Importing base url from .env variable
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    // Retrieving the JWT from the clients local storage
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // If there's a token, set the auth header to a bearer token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // On error --> reject with error
    return Promise.reject(error);
  }
);

export default api;
