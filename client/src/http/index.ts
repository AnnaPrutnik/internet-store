import axios from 'axios';
import AuthService from '../services/AuthService';
import getCookie, { setAuthCookie } from './cookie';

export const API_URL = 'http://localhost:5000/api';

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const getAccessToken = () => {
  const token = getCookie('token');
  console.log(token);
  return token;
};

instance.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await AuthService.refresh();
        setAuthCookie('token', response.data.token);
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return instance(originalRequest);
      } catch (e) {
        console.log('Not authorized, this is error from interceptors');
      }
    }
    throw error;
  }
);

export default instance;
