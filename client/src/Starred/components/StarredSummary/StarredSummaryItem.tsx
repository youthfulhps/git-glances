import React from 'react';
import { TrendsRepository } from '@shared/apis/repo';
import { StarIcon, RepoForkedIcon } from '@primer/octicons-react';

type StarredSummaryItemProps = {
  starredRepo: TrendsRepository;
};

function StarredSummaryItem({ starredRepo }: StarredSummaryItemProps) {
  return (
    <div className="mb-1 flex w-full flex-col py-2 text-start text-sm">
      <div className="flex items-center">
        <img
          src={starredRepo.owner.avatarUrl}
          alt={starredRepo.owner.login}
          className="mr-1 h-4 w-4 rounded-full"
        />

        <p className="truncate text-zinc-200">{starredRepo.name}</p>
      </div>
      <p className="truncate text-xs text-zinc-400">{starredRepo.description}</p>

      <div className="mt-1 flex items-center text-xs text-zinc-400">
        <StarIcon size={10} className="mr-[2px]" />
        <span className="mr-1">{starredRepo.stargazers.totalCount}</span>
        <RepoForkedIcon size={10} className="mr-[2px]" />
        <span>{starredRepo.forks.totalCount}</span>
      </div>
    </div>
  );
}

export default StarredSummaryItem;
