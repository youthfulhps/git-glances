import React from 'react';
import { PullRequest } from '@shared/apis/pullrequest/types';
import PullRequestInfiniteQuery from '../PullRequestInfiniteQuery';
import PullRequestList from './PullRequestList';
import { mockPullRequests } from '../../mocks/mockPullRequests';

function PullRequestBoard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium text-zinc-200">Pull Requests</div>

      <PullRequestInfiniteQuery
        mockContent={
          <PullRequestList
            pages={[{ pullRequests: mockPullRequests }]}
            fetchNextPage={() => {}}
            hasNextPage={false}
            isFetchingNextPage={false}
          />
        }
      >
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
          const pages = (data as { pages?: Array<{ pullRequests: PullRequest[] }> })?.pages;

          return (
            <PullRequestList
              pages={pages ?? []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          );
        }}
      </PullRequestInfiniteQuery>
    </div>
  );
}

export default PullRequestBoard;
