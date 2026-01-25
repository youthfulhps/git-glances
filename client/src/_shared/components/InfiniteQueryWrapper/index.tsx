import React, { ReactNode } from 'react';
import { SuspenseInfiniteQuery, UseSuspenseInfiniteQueryOptions } from '@suspensive/react-query';
import { InfiniteData, QueryKey } from '@tanstack/react-query';

import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';

type InfiniteQueryWrapperProps<
  TQueryFnData,
  TError = Error,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = {
  queryOptions: UseSuspenseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >;
  gridArea?: string;
  mockContent?: ReactNode;
  children: (args: {
    data: TData;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function InfiniteQueryWrapper<
  TQueryFnData,
  TError = Error,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>({
  queryOptions,
  gridArea,
  mockContent,
  children,
}: InfiniteQueryWrapperProps<TQueryFnData, TError, TData, TQueryKey, TPageParam>) {
  return (
    <SuspenseBoundary gridArea={gridArea} mockContent={mockContent}>
      <SuspenseInfiniteQuery {...queryOptions}>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) =>
          children({
            data,
            fetchNextPage: () => {
              fetchNextPage();
            },
            hasNextPage: hasNextPage ?? false,
            isFetchingNextPage,
          })
        }
      </SuspenseInfiniteQuery>
    </SuspenseBoundary>
  );
}

export default InfiniteQueryWrapper;
