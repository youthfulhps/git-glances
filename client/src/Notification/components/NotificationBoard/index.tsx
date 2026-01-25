import React from 'react';
import { Notification } from '@shared/apis/notification/types';
import NotificationInfiniteQuery from '../NotificationInfiniteQuery';
import NotificationList from './NotificationList';

function NotificationBoard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium text-zinc-200">Notifications</div>

      <NotificationInfiniteQuery>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
          const pages = (data as { pages?: Array<{ notifications: Notification[] }> })?.pages;

          return (
            <NotificationList
              pages={pages ?? []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          );
        }}
      </NotificationInfiniteQuery>
    </div>
  );
}

export default NotificationBoard;
