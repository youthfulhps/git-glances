import { Notification } from '@shared/apis/notification/types';

export const getUnreadNotifications = (notifications: Notification[]) => {
  return notifications.filter((notification) => notification.unread);
};

export const getUnreadCount = (notifications: Notification[]) => {
  return getUnreadNotifications(notifications).length;
};
