import React from 'react';
import { Notification } from '@shared/apis/notification/types';
import { getRelativeTimeFromNow } from '@shared/utils/date';
import { DotFillIcon, RepoIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import useNotification from '../../../../hooks/useNotification';

type NotificationItemProps = {
  notification: Notification;
};

function NotificationItem({ notification }: NotificationItemProps) {
  const { routeNotificationThread } = useNotification();

  return (
    <div
      className={classNames(
        'animate-fadeInUp flex cursor-pointer flex-col gap-2 rounded-lg border border-zinc-700 p-3 hover:border-zinc-600',
        notification.unread ? 'bg-zinc-800/50' : 'bg-transparent',
      )}
      onClick={() => routeNotificationThread(notification.subject.url)}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <RepoIcon
            className={classNames(notification.unread ? 'fill-zinc-200' : 'fill-zinc-400')}
            size={12}
          />

          <span
            className={classNames(
              'text-xs',
              notification.unread ? 'text-zinc-200' : 'text-zinc-400',
              notification.repository.private ? 'text-zinc-400' : 'text-zinc-200',
            )}
          >
            {notification.repository.full_name}
          </span>
          {notification.unread && <DotFillIcon className="fill-red-500" size={12} />}
        </div>
        <h3 className="text-xs font-medium text-zinc-400">{notification.subject.title}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={classNames(
            'rounded-lg px-2 py-0.5 text-xs',
            notification.unread ? 'text-zinc-300' : 'text-zinc-500',
          )}
        >
          {notification.reason}
        </span>
        <span className="text-xs text-zinc-500">
          {getRelativeTimeFromNow(notification.updated_at)}
        </span>
      </div>
    </div>
  );
}

export default NotificationItem;
