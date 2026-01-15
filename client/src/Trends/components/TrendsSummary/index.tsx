import React from 'react';

import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';
import { trendsRepoListQueryOptions } from '../../queries/useTrendsRepoListQuery';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import TrendsSummaryItem from './TrendsSummaryItem';

function TrendsSummary() {
  const { openBoard, selectedLanguage } = useBoard();

  const handleClick = () => {
    openBoard('trends');
  };
  return (
    <SuspenseBoundary gridArea="Trends">
      <SuspenseInfiniteQuery {...trendsRepoListQueryOptions(selectedLanguage)}>
        {({ data }) => (
          <SectionV2 onClick={handleClick} gridArea="Trends">
            <TrendsSummaryItem trendsRepo={data.pages[0].repositories[0]} />
          </SectionV2>
        )}
      </SuspenseInfiniteQuery>
    </SuspenseBoundary>
  );
}

export default TrendsSummary;
