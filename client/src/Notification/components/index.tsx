import React from 'react';
import { Notification as NotificationType } from '@shared/apis/notification/types';
import NotificationInfiniteQuery from './NotificationInfiniteQuery';
import NotificationSummary from './NotificationSummary';

function Notification() {
  return (
    <NotificationInfiniteQuery gridArea="Notification">
      {({ data }) => {
        const firstPage = (data as { pages?: Array<{ notifications: NotificationType[] }> })
          ?.pages?.[0];
        const notifications = firstPage?.notifications ?? [];

        return <NotificationSummary notificationList={notifications} />;
      }}
    </NotificationInfiniteQuery>
  );
}

export default Notification;
