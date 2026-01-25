import React, { ReactNode } from 'react';

import InfiniteQueryWrapper from '@shared/components/InfiniteQueryWrapper';
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
    <InfiniteQueryWrapper
      queryOptions={notificationListInfiniteQueryOptions()}
      gridArea={gridArea}
      mockContent={mockContent}
    >
      {children}
    </InfiniteQueryWrapper>
  );
}

export default NotificationInfiniteQuery;
