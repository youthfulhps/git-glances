import React, { ReactNode } from 'react';

import InfiniteQueryWrapper from '@shared/components/InfiniteQueryWrapper';
import { reviewRequestedPRsInfiniteQueryOptions } from '../queries/useReviewRequestedPRQuery';

type PullRequestInfiniteQueryProps = {
  gridArea?: string;
  mockContent?: ReactNode;
  children: (args: {
    data: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => ReactNode;
};

function PullRequestInfiniteQuery({
  gridArea,
  mockContent,
  children,
}: PullRequestInfiniteQueryProps) {
  return (
    <InfiniteQueryWrapper
      queryOptions={reviewRequestedPRsInfiniteQueryOptions()}
      gridArea={gridArea}
      mockContent={mockContent}
    >
      {children}
    </InfiniteQueryWrapper>
  );
}

export default PullRequestInfiniteQuery;
