import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Thisis the url that connects our frontend to our backend in Choreo
const apiUrl = "/choreo-apis/django-react-boilerplate/backend/v1";

const api = axios.create({
  // Importing base url from .env variable
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
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
