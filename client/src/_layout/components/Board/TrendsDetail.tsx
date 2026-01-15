import { TrendsRepository } from '@shared/apis/repo';
import React from 'react';
import TrendsRepoCard from '../../../Trends/components/TrendsRepoList/TrendsRepoCard';

type TrendsDetailProps = {
  trendsRepoList: TrendsRepository[];
};

function TrendsDetail({ trendsRepoList }: TrendsDetailProps) {
  if (!trendsRepoList || trendsRepoList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-500">No trending repositories available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {trendsRepoList.map((repo, index) => (
        <a
          key={index}
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-1 rounded-lg border border-zinc-700 p-3 hover:border-zinc-600 hover:bg-zinc-800/50"
        >
          <TrendsRepoCard trendsRepo={repo} />
        </a>
      ))}
    </div>
  );
}

export default TrendsDetail;
