import { useSuspenseQuery } from '@tanstack/react-query';
import { getNotificationList, Notification } from '@shared/apis/notification';
import { getDateTimeAfterDays } from '@shared/utils/date';
import { useMemo } from 'react';
import { AxiosError } from 'axios';

const useNotificationListQuery = () => {
  const { data: notificationList } = useSuspenseQuery<Notification[], AxiosError>({
    queryKey: ['notificationList'],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getNotificationList(getDateTimeAfterDays(-1));
      return data;
    },
  });

  const notificationUnreadCount = useMemo(() => {
    return notificationList?.filter((notification) => notification.unread).length ?? 0;
  }, [notificationList]);

  const isNotificationEmpty = useMemo(() => {
    return !notificationList?.length;
  }, [notificationList]);

  return {
    notificationList,
    notificationUnreadCount,
    isNotificationEmpty,
  };
};

export default useNotificationListQuery;
