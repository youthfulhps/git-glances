import { axiosInstance } from '../index';
import { GetUser } from './types';

export const getUser: GetUser = () => {
  return axiosInstance.get('/user');
};
