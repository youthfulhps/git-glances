import React from 'react';

import StarredInfiniteQuery from '../StarredInfiniteQuery';
import { TrendsRepository } from '@shared/apis/repo';
import StarredList from './StarredList';

function StarredBoard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-200">Starred Repositories</div>
      </div>

      <StarredInfiniteQuery>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
          const pages = (data as { pages?: Array<{ repositories: TrendsRepository[] }> })?.pages;

          return (
            <StarredList
              pages={pages ?? []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          );
        }}
      </StarredInfiniteQuery>
    </div>
  );
}

export default StarredBoard;
