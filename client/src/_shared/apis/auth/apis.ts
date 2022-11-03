import { authAxiosInstance } from '@shared/apis';

export const getAuthToken = (code: string) => {
  return authAxiosInstance.get(`/authenticate/?code=${code}`);
};
