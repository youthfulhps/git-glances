import { PullRequest } from '@shared/apis/pullrequest/types';
import React, { useEffect, useRef } from 'react';
import { GitPullRequestIcon } from '@primer/octicons-react';
import EmptyState from '@shared/components/EmptyState';
import PullRequestItem from './PullRequestItem';

type PullRequestListProps = {
  pages: Array<{ pullRequests: PullRequest[] }>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

function PullRequestList({
  pages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PullRequestListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const allPRs = pages.flatMap((page) => page.pullRequests);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!allPRs || allPRs.length === 0) {
    return (
      <EmptyState
        title="No review requests"
        description="You don't have any pull requests waiting for your review."
        icon={<GitPullRequestIcon size={32} />}
      />
    );
  }

  return (
    <>
      {allPRs.map((pr) => (
        <PullRequestItem key={pr.id} pullRequest={pr} />
      ))}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex items-center justify-center py-4">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" />
              <p className="text-xs text-zinc-400">Loading more...</p>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default PullRequestList;
