import React, { ReactNode } from 'react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { InfiniteData } from '@tanstack/react-query';

import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';

type InfiniteQueryWrapperProps<TData> = {
  queryOptions: any;
  gridArea?: string;
  mockContent?: ReactNode;
  children: (args: {
    data: InfiniteData<TData>;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function InfiniteQueryWrapper<TData>({
  queryOptions,
  gridArea,
  mockContent,
  children,
}: InfiniteQueryWrapperProps<TData>) {
  return (
    <SuspenseBoundary gridArea={gridArea} mockContent={mockContent}>
      <SuspenseInfiniteQuery {...queryOptions}>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }: any) =>
          children({ data, fetchNextPage, hasNextPage, isFetchingNextPage })
        }
      </SuspenseInfiniteQuery>
    </SuspenseBoundary>
  );
}

export default InfiniteQueryWrapper;
