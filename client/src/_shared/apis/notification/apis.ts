import { axiosInstance } from '@shared/apis';
import { GetNotificationList } from '@shared/apis/notification/types';

export const getNotificationList: GetNotificationList = (params) => {
  const searchParams = new URLSearchParams();
  if (params?.since) searchParams.append('since', params.since);
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.perPage) searchParams.append('per_page', params.perPage.toString());
  searchParams.append('all', 'true');

  return axiosInstance.get(`/notifications?${searchParams.toString()}`);
};
