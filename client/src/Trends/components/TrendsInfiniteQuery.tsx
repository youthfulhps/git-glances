import React, { ReactNode } from 'react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';

import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { trendsRepoListQueryOptions } from '../queries/useTrendsRepoListQuery';

type TrendsInfiniteQueryProps = {
  language: string;
  gridArea?: string;
  mockContent?: ReactNode;
  children: (args: {
    data: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function TrendsInfiniteQuery({
  language,
  gridArea,
  mockContent,
  children,
}: TrendsInfiniteQueryProps) {
  return (
    <SuspenseBoundary gridArea={gridArea} mockContent={mockContent}>
      <SuspenseInfiniteQuery {...trendsRepoListQueryOptions(language)}>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) =>
          children({ data, fetchNextPage, hasNextPage, isFetchingNextPage })
        }
      </SuspenseInfiniteQuery>
    </SuspenseBoundary>
  );
}

export default TrendsInfiniteQuery;
