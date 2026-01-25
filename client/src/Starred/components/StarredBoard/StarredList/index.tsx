import { TrendsRepository } from '@shared/apis/repo';
import React, { useEffect, useRef } from 'react';
import { Star } from '@carbon/icons-react';
import EmptyState from '@shared/components/EmptyState';
import StarredItem from './StarredItem';

type StarredListProps = {
  pages: Array<{ repositories: TrendsRepository[] }>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

function StarredList({ pages, fetchNextPage, hasNextPage, isFetchingNextPage }: StarredListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const allRepos = pages.flatMap((page) => page.repositories);

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

  if (!allRepos || allRepos.length === 0) {
    return (
      <EmptyState
        title="No starred repositories"
        description="Star repositories on GitHub to see them here."
        icon={<Star size={32} />}
      />
    );
  }

  return (
    <>
      {allRepos.map((repo, index) => (
        <StarredItem key={`${repo.name}-${index}`} repo={repo} />
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

export default StarredList;
