import { axiosInstance } from '../index';

export const getUser = () => {
  return axiosInstance.get('/user');
};
