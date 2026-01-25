import React from 'react';
import { Notification } from '@shared/apis/notification/types';
import { BellFillIcon, BellIcon } from '@primer/octicons-react';
import { cn } from '@shared/lib/utils';
import ShinyText from '@shared/components/ShinyText/ShinyText';

type NotificationSummaryProps = {
  notificationList: Notification[];
};

function NotificationSummary({ notificationList }: NotificationSummaryProps) {
  const notificationUnreadCount =
    notificationList?.filter((notification) => notification.unread).length ?? 0;

  const hasUnreadNotifications = notificationUnreadCount > 0;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-x-1.5">
        {hasUnreadNotifications ? (
          <BellFillIcon size={10} className="relative fill-zinc-300" />
        ) : (
          <BellIcon size={10} className="fill-zinc-300" />
        )}

        <ShinyText
          text={
            hasUnreadNotifications
              ? `${notificationUnreadCount} unread notification${notificationUnreadCount > 1 ? 's' : ''}`
              : 'All notifications read'
          }
          className={cn('text-xs', hasUnreadNotifications ? 'text-zinc-200' : 'text-zinc-500')}
        />
      </div>
    </div>
  );
}

export default NotificationSummary;
