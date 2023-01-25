import React from 'react';
import FeatureSection from '@layout/components/FeatureSection';
import useNotificationListQuery from '../queries/useNotificationListQuery';
import NotificationList from './NotificationList';

function Notification() {
  const { notificationList, notificationUnreadCount } = useNotificationListQuery();

  return (
    <FeatureSection summary={notificationUnreadCount} gridArea="Notification">
      <NotificationList notificationList={notificationList} />
    </FeatureSection>
  );
}

export default Notification;
