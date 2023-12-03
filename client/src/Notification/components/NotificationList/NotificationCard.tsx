import React from 'react';
import { Notification } from '@shared/apis/notification';
import { getRelativeTimeFromNow } from '@shared/utils/date';
import { DotFillIcon } from '@primer/octicons-react';
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
          'relative mb-1 flex w-[calc(100%_-_16px)] cursor-pointer items-center justify-between py-2 text-start text-sm hover:text-zinc-400',
          notification.unread ? 'text-zinc-100' : 'text-zinc-300'
        )}
        onClick={() => routeNotificationThread(notification.subject.url)}
      >
        {notification.unread ? (
          <DotFillIcon className="absolute top-[-2px] left-[-4px] fill-emerald-300" />
        ) : null}
        <div className="flex w-full flex-col">
          <span className="truncate">{notification.repository.full_name}</span>
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
