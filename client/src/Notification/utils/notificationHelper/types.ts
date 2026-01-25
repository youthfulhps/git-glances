import { Notification } from '@shared/apis/notification/types';

export type NotificationPage = {
  notifications: Notification[];
  nextPage: number;
  hasMore: boolean;
};
