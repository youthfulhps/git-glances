import { axiosInstance } from '../index';
import { GetUser, GetUserEvents } from './types';

export const getUser: GetUser = () => {
  return axiosInstance.get('/user');
};

export const getUserEvents: GetUserEvents = (username: string) => {
  return axiosInstance.get(`/users/${username}/events/public`);
};
