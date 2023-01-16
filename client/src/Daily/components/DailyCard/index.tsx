import React from 'react';
import { Repository } from '@shared/apis/repo';
import FeatureSection from '@layout/components/FeatureSection';
import RepositoryDetail from '@shared/components/Details/Repository';
import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react';

type DailyProps = {
  dailyRepo: Repository;
  hasTodayContribution: boolean;
};

function DailyCard({ dailyRepo, hasTodayContribution }: DailyProps) {
  const summaryIcon = hasTodayContribution ? (
    <CheckCircleFillIcon size={48} className="fill-emerald-500" />
  ) : (
    <XCircleFillIcon size={48} className="fill-red-400" />
  );

  return (
    <FeatureSection summary={summaryIcon} summaryType="icon" gridArea="Daily">
      <RepositoryDetail repository={dailyRepo} />
    </FeatureSection>
  );
}

export default DailyCard;
