import React from 'react';
import { Notification } from '@shared/apis/notification/types';
import SectionV2 from '@layout/components/SectionV2';
import { BellFillIcon } from '@primer/octicons-react';
import { cn } from '@shared/lib/utils';
import ShinyText from '@shared/components/ShinyText/ShinyText';
import { useBoard } from '@shared/contexts/BoardContext';

type NotificationListProps = {
  notificationList: Notification[];
};

function NotificationList({ notificationList }: NotificationListProps) {
  const { openBoard } = useBoard();
  const notificationUnreadCount =
    notificationList?.filter((notification) => !notification.unread).length ?? 0;

  const handleClick = () => {
    openBoard('notification');
  };

  return (
    <SectionV2 gridArea="Notification" className="cursor-pointer" onClick={handleClick}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-x-1.5">
          <div className="relative">
            <BellFillIcon size={14} className="fill-zinc-300" />
            {notificationUnreadCount > 0 && (
              <div className="absolute right-0 top-0.5 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-red-500" />
            )}
          </div>
          <ShinyText
            text={
              notificationUnreadCount > 0
                ? `${notificationUnreadCount} unread notification${notificationUnreadCount > 1 ? 's' : ''}`
                : 'All notifications read'
            }
            className={cn(
              'text-sm font-light',
              notificationUnreadCount > 0 ? 'text-zinc-300' : 'text-zinc-500',
            )}
          />
        </div>
      </div>
    </SectionV2>
  );
}

export default NotificationList;
