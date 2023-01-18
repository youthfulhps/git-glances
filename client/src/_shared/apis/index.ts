import axios from 'axios';
import cookie from 'cookiejs';

export const getAccessToken = () => {
  return cookie.get('gitin:token');
};

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_PATH,
  headers: {},
});

export const authAxiosInstance = axios.create({
  baseURL: process.env.AUTH_BASE_URL,
  headers: {},
});

axiosInstance.interceptors.request.use((config) => {
  if (!config || !config.headers) {
    throw new Error("Expected 'config' and 'config.headers' not to be undefined");
  }

  const accessToken = getAccessToken();

  if (!accessToken) {
    const { CancelToken } = axios;
    return {
      ...config,
      cancelToken: new CancelToken((cancel) => cancel('Access token is required!')),
    };
  }

  config.headers.Authorization = `Token ${accessToken}`;

  return config;
});
