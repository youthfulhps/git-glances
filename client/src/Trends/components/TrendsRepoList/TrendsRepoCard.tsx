import React from 'react';
import { TrendsRepository } from '@shared/apis/repo';
import { StarIcon, RepoForkedIcon } from '@primer/octicons-react';

type TrendsRepoCardProps = {
  trendsRepo: TrendsRepository;
};

function TrendsRepoCard({ trendsRepo }: TrendsRepoCardProps) {
  return (
    <li>
      <a
        href={trendsRepo.url}
        target="_blank"
        className="mb-1 flex w-full items-center justify-between py-2 text-start text-sm hover:text-zinc-400"
        rel="noreferrer"
      >
        <div className="w-[calc(100%_-_48px)]">
          {trendsRepo.name}
          <p className="truncate text-xs text-zinc-400">{trendsRepo.description}</p>
        </div>
        <div className="flex items-center text-xs">
          <StarIcon size={10} className="mr-[2px]" />
          <span className="mr-1">{trendsRepo.stargazers.totalCount}</span>
          <RepoForkedIcon size={10} className="mr-[2px]" />
          <span>{trendsRepo.forks.totalCount}</span>
        </div>
      </a>
    </li>
  );
}

export default TrendsRepoCard;
