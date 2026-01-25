import React from 'react';
import { Notification as NotificationType } from '@shared/apis/notification/types';
import NotificationInfiniteQuery from './NotificationInfiniteQuery';
import NotificationSummary from './NotificationSummary';
import { mockNotifications } from '../mocks/mockNotifications';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';

function Notification() {
  const { openNotificationBoard } = useBoard();
  return (
    <NotificationInfiniteQuery
      gridArea="Notification"
      mockContent={<NotificationSummary notificationList={mockNotifications} />}
    >
      {({ data }) => {
        const firstPage = (data as { pages?: Array<{ notifications: NotificationType[] }> })
          ?.pages?.[0];
        const notifications = firstPage?.notifications ?? [];

        return (
          <SectionV2
            gridArea="Notification"
            className="cursor-pointer"
            onClick={openNotificationBoard}
          >
            <NotificationSummary notificationList={notifications} />
          </SectionV2>
        );
      }}
    </NotificationInfiniteQuery>
  );
}

export default Notification;
