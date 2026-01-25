import React from 'react';

import { ContributionsCollection } from '@shared/apis/contribution';
import ContributionHeatmap from './ContributionHeatmap';

type ContributionDetailProps = {
  contributionsCollection: ContributionsCollection;
};

function ContributionDetail({ contributionsCollection }: ContributionDetailProps) {
  const weeks = contributionsCollection.contributionCalendar.weeks || [];

  return (
    <div className="h-full w-full">
      <ContributionHeatmap weeks={weeks} />
    </div>
  );
}

export default ContributionDetail;
