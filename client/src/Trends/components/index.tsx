import React from 'react';
import { trendsRepoListQueryOptions } from '../queries/useTrendsRepoListQuery';
import TrendsRepoList from './TrendsRepoList';
import { useBoard } from '@shared/contexts/BoardContext';
import { SuspenseQuery } from '@suspensive/react-query';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';

function Trends() {
  const { openBoard } = useBoard();

  const handleClick = () => {
    openBoard('trends');
  };

  return (
    <SuspenseBoundary gridArea="Trends">
      <SuspenseQuery {...trendsRepoListQueryOptions()}>
        {({ data: trendsRepoList }) => <TrendsRepoList trendsRepoList={trendsRepoList} />}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default Trends;
