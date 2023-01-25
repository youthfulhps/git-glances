import { axiosInstance } from '@shared/apis';
import { GetNotificationList } from '@shared/apis/notification/types';

export const getNotificationList: GetNotificationList = (since: string) => {
  return axiosInstance.get(`/notifications?all=true&since=${since}`);
};
