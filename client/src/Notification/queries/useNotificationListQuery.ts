import { infiniteQueryOptions } from '@tanstack/react-query';
import { getNotificationList } from '@shared/apis/notification';
import { notificationQueryKeys } from './queryKeys';

export const notificationListInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: notificationQueryKeys.list(),
    staleTime: 60 * 60 * 1000,
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await getNotificationList({ page: pageParam, perPage: 50 });

      return {
        notifications: data,
        nextPage: pageParam + 1,
        hasMore: data.length >= 50,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
  });
