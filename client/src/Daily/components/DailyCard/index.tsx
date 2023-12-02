import React from 'react';
import { Repository } from '@shared/apis/repo';
import FeatureSection from '@layout/components/FeatureSection';
import RepositoryDetail from '@shared/components/Details/Repository';
import { CheckCircleFillIcon, XCircleFillIcon, RepoDeletedIcon } from '@primer/octicons-react';

type DailyProps = {
  dailyRepo: Repository | null;
  hasTodayContribution: boolean;
  resetDailyRepo: () => void;
};

function DailyCard({ dailyRepo, hasTodayContribution, resetDailyRepo }: DailyProps) {
  if (!dailyRepo) return null;

  const summaryIcon = hasTodayContribution ? (
    <CheckCircleFillIcon size={40} className="fill-emerald-500" />
  ) : (
    <XCircleFillIcon size={40} className="fill-red-400" />
  );

  return (
    <FeatureSection summary={summaryIcon} summaryType="icon" gridArea="Daily" className="relative">
      <RepositoryDetail repository={dailyRepo} onReset={resetDailyRepo} />
    </FeatureSection>
  );
}

export default DailyCard;
