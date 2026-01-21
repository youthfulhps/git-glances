import React, { ReactNode } from 'react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';

import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { notificationListInfiniteQueryOptions } from '../queries/useNotificationListQuery';

type NotificationInfiniteQueryProps = {
  gridArea?: string;
  mockContent?: ReactNode;
  children: (args: {
    data: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function NotificationInfiniteQuery({
  gridArea,
  mockContent,
  children,
}: NotificationInfiniteQueryProps) {
  return (
    <SuspenseBoundary gridArea={gridArea} mockContent={mockContent}>
      <SuspenseInfiniteQuery {...notificationListInfiniteQueryOptions()}>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) =>
          children({ data, fetchNextPage, hasNextPage, isFetchingNextPage })
        }
      </SuspenseInfiniteQuery>
    </SuspenseBoundary>
  );
}

export default NotificationInfiniteQuery;
