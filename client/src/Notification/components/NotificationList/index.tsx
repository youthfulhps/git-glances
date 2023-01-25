import React from 'react';
import { Notification } from '@shared/apis/notification/types';
import NotificationCard from './NotificationCard';

type NotificationListProps = {
  notificationList: Notification[];
};

function NotificationList({ notificationList }: NotificationListProps) {
  return (
    <ul className="my-1 h-[130px] overflow-y-scroll">
      {notificationList.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </ul>
  );
}

export default NotificationList;
