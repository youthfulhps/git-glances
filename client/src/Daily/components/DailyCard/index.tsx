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
    <FeatureSection summary={summaryIcon} summaryType="icon" gridArea="Daily">
      <RepositoryDetail repository={dailyRepo} />
      <button
        onClick={resetDailyRepo}
        className="mt-3 flex w-full cursor-pointer items-center justify-end text-[8px] text-zinc-400 hover:text-zinc-200"
      >
        <RepoDeletedIcon size={12} className="mr-1" />
        <span>Reset daily repository</span>
      </button>
    </FeatureSection>
  );
}

export default DailyCard;
