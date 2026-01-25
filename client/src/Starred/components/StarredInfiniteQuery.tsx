import React, { ReactNode } from 'react';

import InfiniteQueryWrapper from '@shared/components/InfiniteQueryWrapper';
import { starredRepoListQueryOptions } from '../queries/useStarredRepoListQuery';

type StarredInfiniteQueryProps = {
  gridArea?: string;
  mockContent?: ReactNode;
  children: (args: {
    data: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function StarredInfiniteQuery({ gridArea, mockContent, children }: StarredInfiniteQueryProps) {
  return (
    <InfiniteQueryWrapper
      queryOptions={starredRepoListQueryOptions()}
      gridArea={gridArea}
      mockContent={mockContent}
    >
      {children}
    </InfiniteQueryWrapper>
  );
}

export default StarredInfiniteQuery;
