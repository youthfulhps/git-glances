import React from 'react';
import { SuspenseQuery } from '@suspensive/react-query';
import { notificationListQueryOptions } from '../Notification/queries/useNotificationListQuery';

function NotificationDetail() {
  return (
    <SuspenseQuery {...notificationListQueryOptions()}>
      {({ data: notificationList }) => {
        if (!notificationList || notificationList.length === 0) {
          return (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-zinc-500">No notifications</p>
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-2">
            {notificationList.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-3 hover:border-zinc-600 hover:bg-zinc-800/50"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium text-zinc-200">
                    {notification.subject?.title}
                  </h3>
                  <p className="text-xs text-zinc-400">{notification.repository?.full_name}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                    {notification.reason}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {new Date(notification.updated_at).toLocaleString()}
                  </span>
                </div>

                {notification.subject?.url && (
                  <a
                    href={notification.subject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            ))}
          </div>
        );
      }}
    </SuspenseQuery>
  );
}

export default NotificationDetail;
