import React from 'react';
import { Notification } from '@shared/apis/notification/types';
import NotificationCard from './NotificationCard';
import EmptyNotification from './EmptyNotification';

type NotificationListProps = {
  notificationList: Notification[];
  isNotificationEmpty: boolean;
};

function NotificationList({ notificationList, isNotificationEmpty }: NotificationListProps) {
  if (isNotificationEmpty) return <EmptyNotification />;

  return (
    <ul className="my-1 h-[130px] overflow-y-scroll">
      {notificationList.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </ul>
  );
}

export default NotificationList;
