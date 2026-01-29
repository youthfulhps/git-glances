import { axiosInstance } from '../index';
import { GetUser, GetUserEvents } from './types';

export const getUser: GetUser = () => {
  return axiosInstance.get('/user');
};

export const getUserEvents: GetUserEvents = async (username: string) => {
  // Use /users/{username}/events to get both public and private events (requires auth)
  // Fetch multiple pages to ensure we have at least 2 weeks of data
  const [page1, page2] = await Promise.all([
    axiosInstance.get(`/users/${username}/events?per_page=100&page=1`),
    axiosInstance.get(`/users/${username}/events?per_page=100&page=2`),
  ]);

  // Combine results from both pages
  return {
    ...page1,
    data: [...page1.data, ...page2.data],
  };
};
