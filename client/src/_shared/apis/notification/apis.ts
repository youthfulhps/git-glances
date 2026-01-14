import { axiosInstance } from '@shared/apis';
import { GetNotificationList } from '@shared/apis/notification/types';

export const getNotificationList: GetNotificationList = (since) => {
  const params = new URLSearchParams();
  if (since) params.append('since', since);
  params.append('all', 'true');

  return axiosInstance.get(`/notifications?${params.toString()}`);
};
