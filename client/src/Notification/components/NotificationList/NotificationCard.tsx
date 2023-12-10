import React from 'react';
import { Notification } from '@shared/apis/notification';
import { getRelativeTimeFromNow } from '@shared/utils/date';
import { DotFillIcon, RepoIcon, RepoLockedIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import useNotification from '../../hooks/useNotification';

type NotificationCardProps = {
  notification: Notification;
};

function NotificationCard({ notification }: NotificationCardProps) {
  const { routeNotificationThread } = useNotification();

  return (
    <li>
      <button
        className={classNames(
          'mb-1 flex w-[calc(100%_-_16px)] cursor-pointer items-center justify-between py-2 text-start text-sm hover:opacity-80',
          notification.unread ? 'text-zinc-100' : 'text-zinc-400'
        )}
        onClick={() => routeNotificationThread(notification.subject.url)}
      >
        <div className="flex w-full flex-col">
          <div className="flex items-center">
            {notification.repository.private ? (
              <RepoLockedIcon className="mr-1 fill-zinc-400" size={12} />
            ) : (
              <RepoIcon className="mr-1 fill-zinc-100" size={12} />
            )}
            <span
              className={classNames(
                'truncate',
                notification.repository.private ? 'text-zinc-400' : ''
              )}
            >
              {notification.repository.full_name}
            </span>
            {notification.unread && !notification.repository.private ? (
              <DotFillIcon className="fill-emerald-300" />
            ) : null}
          </div>
          <p className="truncate text-xs text-zinc-400">{notification.subject.title}</p>
          <p className="truncate text-xs text-zinc-400">
            {getRelativeTimeFromNow(notification.updated_at)}
          </p>
        </div>
      </button>
    </li>
  );
}

export default NotificationCard;
