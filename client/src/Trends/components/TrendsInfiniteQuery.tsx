import React, { ReactNode } from 'react';

import InfiniteQueryWrapper from '@shared/components/InfiniteQueryWrapper';
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
    <InfiniteQueryWrapper
      queryOptions={trendsRepoListQueryOptions(language)}
      gridArea={gridArea}
      mockContent={mockContent}
    >
      {children}
    </InfiniteQueryWrapper>
  );
}

export default TrendsInfiniteQuery;
