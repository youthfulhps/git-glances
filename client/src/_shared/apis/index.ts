import axios from 'axios';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '@shared/utils/storage';
import { parseAxiosError, ErrorCode, TOKEN_REQUIRED_CANCEL_MESSAGE } from '@shared/utils/errors';

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

  const accessToken = await getStoredItem(STORAGE_KEYS.GITHUB_TOKEN);

  if (!accessToken) {
    const { CancelToken } = axios;
    return {
      ...config,
      cancelToken: new CancelToken((cancel) => cancel(TOKEN_REQUIRED_CANCEL_MESSAGE)),
    };
  }

  config.headers.Authorization = `Token ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const parsedError = parseAxiosError(error);

    // 요청에 쓴 토큰이 지금 저장된 토큰일 때만 무효 처리한다.
    // (이전 토큰으로 보낸 요청의 늦은 401이 새로 입력한 토큰을 지우지 않도록)
    const sentToken = String(error?.config?.headers?.Authorization ?? '').replace(/^Token /, '');
    const isCurrentToken =
      !!sentToken && sentToken === (await getStoredItem(STORAGE_KEYS.GITHUB_TOKEN));

    // Handle authentication errors
    if (
      isCurrentToken &&
      (parsedError.code === ErrorCode.UNAUTHORIZED ||
        parsedError.code === ErrorCode.FORBIDDEN ||
        parsedError.code === ErrorCode.TOKEN_EXPIRED)
    ) {
      // Clear token from storage
      await setStoredItem(STORAGE_KEYS.GITHUB_TOKEN, '');

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
