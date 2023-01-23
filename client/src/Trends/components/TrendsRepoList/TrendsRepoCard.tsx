import React from 'react';
import { TrendsRepository } from '@shared/apis/repo';
import { StarIcon, RepoForkedIcon } from '@primer/octicons-react';

type TrendsRepoCardProps = {
  trendsRepo: TrendsRepository;
};

function TrendsRepoCard({ trendsRepo }: TrendsRepoCardProps) {
  return (
    <li className="flex w-full items-center justify-between py-2 text-start">
      <div className="w-[calc(100%_-_48px)]">
        <a
          href={trendsRepo.url}
          target="_blank"
          className="mb-1 text-sm hover:text-zinc-400"
          rel="noreferrer"
        >
          {trendsRepo.name}
        </a>
        <p className="truncate text-xs text-zinc-400">{trendsRepo.description}</p>
      </div>
      <div className="flex items-center text-xs">
        <StarIcon size={10} className="mr-[2px]" />
        <span className="mr-1">{trendsRepo.stargazers.totalCount}</span>
        <RepoForkedIcon size={10} className="mr-[2px]" />
        <span>{trendsRepo.forks.totalCount}</span>
      </div>
    </li>
  );
}

export default TrendsRepoCard;
