import { queryOptions } from '@tanstack/react-query';
import { getNotificationList } from '@shared/apis/notification';
import { notificationQueryKeys } from './queryKeys';

export const notificationListQueryOptions = () =>
  queryOptions({
    queryKey: notificationQueryKeys.list(),
    staleTime: 60 * 60 * 1000,
    queryFn: async () => {
      const { data } = await getNotificationList();
      return [
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
      ];
    },
  });
