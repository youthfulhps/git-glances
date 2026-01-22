import { Notification } from '@shared/apis/notification/types';
import React, { useEffect, useRef } from 'react';
import { BellIcon } from '@primer/octicons-react';
import EmptyState from '@shared/components/EmptyState';
import NotificationItem from './NotificationItem';

type NotificationListProps = {
  pages: Array<{ notifications: Notification[] }>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

function NotificationList({
  pages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: NotificationListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const allNotifications = pages.flatMap((page) => page.notifications);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!allNotifications || allNotifications.length === 0) {
    return (
      <EmptyState
        title="No notifications"
        description="You're all caught up! Check back later for new notifications."
        icon={<BellIcon size={32} />}
      />
    );
  }

  return (
    <>
      {allNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex items-center justify-center py-4">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" />
              <p className="text-xs text-zinc-400">Loading more...</p>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default NotificationList;
