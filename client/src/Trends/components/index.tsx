import React from 'react';
import FeatureSection from '@layout/components/FeatureSection';
import useTrendsRepoListQuery from '../queries/useTrendsRepoListQuery';
import TrendsRepoList from './TrendsRepoList';
import { useBoard } from '@shared/contexts/BoardContext';

function Trends() {
  const { openBoard } = useBoard();
  const trendsRepoList = useTrendsRepoListQuery();

  const handleClick = () => {
    openBoard('trends');
  };

  return (
    <FeatureSection summary={trendsRepoList[0].name} gridArea="Trends" onClick={handleClick}>
      <div className="h-2" />
      <TrendsRepoList trendsRepoList={trendsRepoList} />
    </FeatureSection>
  );
}

export default Trends;
