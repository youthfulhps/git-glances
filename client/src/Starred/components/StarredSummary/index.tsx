import React from 'react';

import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';
import StarredSummaryItem from './StarredSummaryItem';
import StarredInfiniteQuery from '../StarredInfiniteQuery';
import { TrendsRepository } from '@shared/apis/repo';

function StarredSummary() {
  const { openStarredBoard } = useBoard();

  const handleClick = () => {
    openStarredBoard();
  };
  return (
    <StarredInfiniteQuery gridArea="Starred">
      {({ data }) => {
        const pages = (data as { pages?: Array<{ repositories: TrendsRepository[] }> })?.pages;
        const firstRepo = pages?.[0]?.repositories?.[0];

        if (!firstRepo) {
          return (
            <SectionV2 gridArea="Starred" hasBackground={false}>
              <p className="text-sm text-zinc-500">No starred repositories available</p>
            </SectionV2>
          );
        }

        return (
          <SectionV2 onClick={handleClick} gridArea="Starred">
            <StarredSummaryItem starredRepo={firstRepo} />
          </SectionV2>
        );
      }}
    </StarredInfiniteQuery>
  );
}

export default StarredSummary;
