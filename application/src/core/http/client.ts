import axios from 'axios';
import { __app__ } from "@core/MainActivity";

export const API_PATHS = {
  REFRESH_TOKEN: '/refreshToken',
  SUBSCRIPTION_INFO: '/subscription-info',
  VERIFY_CODE: '/verify',
  SUBSCRIPTION_LIST: '/get-subscription-list',
  CANCEL_SUBSCRIPTION: '/cancel-subscription-paypro',
};

const axiosImpl = axios.create({
  baseURL: `${__app__.settings.API_URL}${__app__.settings.API_V2}`,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosImpl.interceptors.request.use(async (config) => {
  const token = __app__.getCurrentUser.tokens.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosImpl.interceptors.response.use(async (config) => ({
  ...config,
  success: config.status === 200 || config.status === 201,
}),
async (error) => Promise.reject(error));

export { axiosImpl };
