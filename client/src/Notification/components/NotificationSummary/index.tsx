import React from 'react';
import { Notification } from '@shared/apis/notification/types';
import SectionV2 from '@layout/components/SectionV2';
import { BellFillIcon, BellIcon } from '@primer/octicons-react';
import { cn } from '@shared/lib/utils';
import ShinyText from '@shared/components/ShinyText/ShinyText';
import { useBoard } from '@shared/contexts/BoardContext';

type NotificationSummaryProps = {
  notificationList: Notification[];
};

function NotificationSummary({ notificationList }: NotificationSummaryProps) {
  const { openNotificationBoard } = useBoard();
  const notificationUnreadCount =
    notificationList?.filter((notification) => notification.unread).length ?? 0;

  const hasUnreadNotifications = notificationUnreadCount > 0;

  const handleClick = () => {
    openNotificationBoard();
  };

  return (
    <SectionV2 gridArea="Notification" className="cursor-pointer" onClick={handleClick}>
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
    </SectionV2>
  );
}

export default NotificationSummary;
