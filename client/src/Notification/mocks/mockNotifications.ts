import { Notification } from '@shared/apis/notification/types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    unread: true,
    reason: 'mention',
    updated_at: '2024-01-20T10:00:00Z',
    last_read_at: '',
    subject: {
      title: 'Great work on the PR!',
      url: 'https://api.github.com/repos/example/repo/issues/1',
      latest_comment_url: 'https://api.github.com/repos/example/repo/issues/comments/1',
      type: 'Issue',
    },
    repository: {} as any,
    url: '',
    subscription_url: '',
  },
  {
    id: '2',
    unread: true,
    reason: 'review_requested',
    updated_at: '2024-01-20T09:00:00Z',
    last_read_at: '',
    subject: {
      title: 'Review requested on feature branch',
      url: 'https://api.github.com/repos/example/repo/pulls/2',
      latest_comment_url: '',
      type: 'PullRequest',
    },
    repository: {} as any,
    url: '',
    subscription_url: '',
  },
  {
    id: '3',
    unread: false,
    reason: 'comment',
    updated_at: '2024-01-19T15:00:00Z',
    last_read_at: '2024-01-19T16:00:00Z',
    subject: {
      title: 'Bug fix deployed',
      url: 'https://api.github.com/repos/example/repo/issues/3',
      latest_comment_url: '',
      type: 'Issue',
    },
    repository: {} as any,
    url: '',
    subscription_url: '',
  },
];
