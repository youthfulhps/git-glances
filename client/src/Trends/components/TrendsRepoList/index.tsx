import React from 'react';
import { TrendsRepository } from '@shared/apis/repo';
import TrendsRepoCard from './TrendsRepoCard';

type TrendsCardProps = {
  trendsRepoList: TrendsRepository[];
};

function TrendsCard({ trendsRepoList }: TrendsCardProps) {
  return (
    <ul className="my-1 h-[130px] overflow-y-scroll">
      {trendsRepoList.map((trendsRepo) => (
        <TrendsRepoCard key={trendsRepo.name} trendsRepo={trendsRepo} />
      ))}
    </ul>
  );
}

export default TrendsCard;
