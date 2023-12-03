import { Notification } from '@shared/apis/notification';

export const mockedNotificationList: Notification[] = [
  {
    id: '5436876482',
    unread: false,
    reason: 'subscribed',
    updated_at: '2023-10-27T00:41:12Z',
    last_read_at: '2023-01-28T10:18:44Z',
    subject: {
      title: 'Bump ua-parser-js from 0.7.21 to 0.7.33 in /client',
      url: '',
      latest_comment_url: '',
      type: 'PullRequest',
    },
    repository: {
      full_name: 'youthfulhps/test_repo',
    } as any,
    url: 'https://api.github.com/notifications/threads/5436876482',
    subscription_url: 'https://api.github.com/notifications/threads/5436876482/subscription',
  },
  {
    id: '5424128039',
    unread: true,
    reason: 'state_change',
    updated_at: '2023-01-25T17:47:14Z',
    last_read_at: '',
    subject: {
      title: 'v1.7.2',
      url: '',
      latest_comment_url: '',
      type: 'PullRequest',
    },
    repository: {} as any,
    url: '',
    subscription_url: '',
  },
];
