import axios from 'axios';
import { getChromeStorageItem, removeChromeStorageItem } from '@shared/utils/chrome';
import { decryptToken, isCryptoSupported } from '@shared/utils/crypto';
import { parseAxiosError, ErrorCode } from '@shared/utils/errors';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

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

  // Skip authentication for public APIs
  if (config.skipAuth) {
    return config;
  }

  let accessToken = null;

  if (process.env.IS_WEB) {
    const encryptedToken = localStorage.getItem('gitGlances:token') || '';
    // Web Crypto API를 지원하면 복호화
    if (encryptedToken && isCryptoSupported()) {
      accessToken = await decryptToken(encryptedToken);
    } else {
      accessToken = encryptedToken;
    }
  } else {
    const token = await getChromeStorageItem<string>('gitGlances:token');
    accessToken = token;
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const parsedError = parseAxiosError(error);

    // Handle authentication errors
    if (
      parsedError.code === ErrorCode.UNAUTHORIZED ||
      parsedError.code === ErrorCode.FORBIDDEN ||
      parsedError.code === ErrorCode.TOKEN_EXPIRED
    ) {
      // Clear token from storage
      if (process.env.IS_WEB) {
        localStorage.removeItem('gitGlances:token');
      } else {
        await removeChromeStorageItem('gitGlances:token');
      }

      // Dispatch a custom event to notify the app that token was cleared
      window.dispatchEvent(new CustomEvent('token-invalid'));
    }

    // Handle rate limiting
    if (parsedError.code === ErrorCode.RATE_LIMIT) {
      console.warn('Rate limit exceeded. Please wait before making more requests.');
    }

    return Promise.reject(parsedError);
  },
);
