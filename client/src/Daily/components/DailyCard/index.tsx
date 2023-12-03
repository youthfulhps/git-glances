import React from 'react';
import { Repository } from '@shared/apis/repo';
import FeatureSection from '@layout/components/FeatureSection';
import RepositoryDetail from '@shared/components/Details/Repository';
import { CheckCircleFillIcon, RepoDeletedIcon, XCircleFillIcon } from '@primer/octicons-react';

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
    <FeatureSection summary={summaryIcon} gridArea="Daily">
      <div className="flex items-end">
        <RepositoryDetail repository={dailyRepo} className="w-[calc(100%_-_42px)]" />
        <button
          className="flex cursor-pointer items-center text-[8px] hover:!text-zinc-400 [&:hover>svg]:!fill-zinc-400"
          onClick={resetDailyRepo}
        >
          <RepoDeletedIcon className="!mr-1 h-3 w-3 !fill-zinc-200" />
          <span>Reset</span>
        </button>
      </div>
    </FeatureSection>
  );
}

export default DailyCard;
