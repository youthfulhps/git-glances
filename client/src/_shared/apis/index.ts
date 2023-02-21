import axios from 'axios';
import { getChromeStorageItem } from '@shared/utils/chrome';

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_PATH,
  headers: {},
});

export const authAxiosInstance = axios.create({
  baseURL: process.env.AUTH_BASE_URL,
  headers: {},
});

axiosInstance.interceptors.request.use(async (config) => {
  if (!config || !config.headers) {
    throw new Error("Expected 'config' and 'config.headers' not to be undefined");
  }

  let accessToken = null;

  if (process.env.IS_WEB) {
    accessToken = JSON.parse(localStorage.getItem('gitGlances:token') || '');
  } else {
    const token = await getChromeStorageItem<string>('gitGlances:token');
    accessToken = JSON.parse(token);
  }

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
