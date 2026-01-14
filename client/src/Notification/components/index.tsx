import React from 'react';
import { notificationListQueryOptions } from '../queries/useNotificationListQuery';
import NotificationList from './NotificationList';
import { SuspenseQuery } from '@suspensive/react-query';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';

function Notification() {
  return (
    <SuspenseBoundary gridArea="Notification">
      <SuspenseQuery {...notificationListQueryOptions()}>
        {({ data: notificationList }) => <NotificationList notificationList={notificationList} />}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default Notification;
