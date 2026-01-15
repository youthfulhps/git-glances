import React from 'react';
import { TrendsRepository } from '@shared/apis/repo';
import TrendsRepoCard from './TrendsRepoCard';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';

type TrendsCardProps = {
  trendsRepoList: TrendsRepository[];
};

function TrendsCard({ trendsRepoList }: TrendsCardProps) {
  const { openBoard } = useBoard();
  const handleClick = () => {
    openBoard('trends');
  };
  return (
    <SectionV2 onClick={handleClick}>
      <TrendsRepoCard key={trendsRepoList[0].name} trendsRepo={trendsRepoList[0]} />
    </SectionV2>
  );
}

export default TrendsCard;
