import React, { ReactNode } from 'react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';

import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { notificationListInfiniteQueryOptions } from '../queries/useNotificationListQuery';

type NotificationInfiniteQueryProps = {
  gridArea?: string;
  children: (args: {
    data: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function NotificationInfiniteQuery({ gridArea, children }: NotificationInfiniteQueryProps) {
  return (
    <SuspenseBoundary gridArea={gridArea}>
      <SuspenseInfiniteQuery {...notificationListInfiniteQueryOptions()}>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) =>
          children({ data, fetchNextPage, hasNextPage, isFetchingNextPage })
        }
      </SuspenseInfiniteQuery>
    </SuspenseBoundary>
  );
}

export default NotificationInfiniteQuery;
