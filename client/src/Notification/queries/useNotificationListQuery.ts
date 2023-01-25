import { useQuery } from '@tanstack/react-query';
import { getNotificationList, Notification } from '@shared/apis/notification';
import { getTodayDateTime } from '@shared/utils/date';
import { useMemo } from 'react';

const useNotificationListQuery = () => {
  const { data: notificationList } = useQuery({
    queryKey: ['notificationList'],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getNotificationList(getTodayDateTime());
      return data;
    },
  });

  const notificationUnreadCount = useMemo(() => {
    return notificationList?.filter((notification) => notification.unread).length ?? 0;
  }, [notificationList]);

  return {
    notificationList: notificationList as Notification[],
    notificationUnreadCount,
  };
};

export default useNotificationListQuery;
