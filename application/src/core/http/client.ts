import axios from 'axios';
import { settings } from '@core/Settings';
import { __app__ } from "@core/MainActivity";

const axiosImpl = axios.create({
  baseURL: `${settings.API_URL}${settings.API_V2}`,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosImpl.interceptors.request.use(async (config) => {
  const token = __app__.getCurrentUser.tokens.access_token;

  if (token) {
    config.headers.Authorization = `Bearer@${token}`;
  }

  return config;
});

axiosImpl.interceptors.response.use(async (config) => ({
  ...config,
  success: config.status === 200 || config.status === 201,
}),
async (error) => Promise.reject(error));

export { axiosImpl };
