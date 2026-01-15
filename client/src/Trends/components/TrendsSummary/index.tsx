import React from 'react';

import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';
import TrendsSummaryItem from './TrendsSummaryItem';
import TrendsInfiniteQuery from '../TrendsInfiniteQuery';
import { TrendsRepository } from '@shared/apis/repo';

function TrendsSummary() {
  const { openTrendsBoard, selectedLanguage } = useBoard();

  const handleClick = () => {
    openTrendsBoard();
  };
  return (
    <TrendsInfiniteQuery language={selectedLanguage} gridArea="Trends">
      {({ data }) => {
        const pages = (data as { pages?: Array<{ repositories: TrendsRepository[] }> })?.pages;
        const firstRepo = pages?.[0]?.repositories?.[0];

        if (!firstRepo) {
          return (
            <SectionV2 gridArea="Trends" hasBackground={false}>
              <p className="text-sm text-zinc-500">No trending repositories available</p>
            </SectionV2>
          );
        }

        return (
          <SectionV2 onClick={handleClick} gridArea="Trends">
            <TrendsSummaryItem trendsRepo={firstRepo} />
          </SectionV2>
        );
      }}
    </TrendsInfiniteQuery>
  );
}

export default TrendsSummary;
