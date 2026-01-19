import React, { ReactNode } from 'react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';

import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { starredRepoListQueryOptions } from '../queries/useStarredRepoListQuery';

type StarredInfiniteQueryProps = {
  gridArea?: string;
  children: (args: {
    data: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function StarredInfiniteQuery({ gridArea, children }: StarredInfiniteQueryProps) {
  return (
    <SuspenseBoundary gridArea={gridArea}>
      <SuspenseInfiniteQuery {...starredRepoListQueryOptions()}>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) =>
          children({ data, fetchNextPage, hasNextPage, isFetchingNextPage })
        }
      </SuspenseInfiniteQuery>
    </SuspenseBoundary>
  );
}

export default StarredInfiniteQuery;
