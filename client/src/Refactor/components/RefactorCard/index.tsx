import React from 'react';
import FeatureSection from '@layout/components/FeatureSection';
import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react';
import { RefactorSuggestedRepoInfo } from '../../atoms/types';
import RefactorDetail from './RefactorDetail';

type RefactorCardProps = {
  refactorSuggestedRepoInfo: RefactorSuggestedRepoInfo;
};

function RefactorCard({ refactorSuggestedRepoInfo }: RefactorCardProps) {
  const summaryIcon = refactorSuggestedRepoInfo.hasTodayCommit ? (
    <CheckCircleFillIcon size={40} className="fill-emerald-500" />
  ) : (
    <XCircleFillIcon size={40} className="fill-red-400" />
  );

  return (
    <FeatureSection summary={summaryIcon} gridArea="Refactor">
      {refactorSuggestedRepoInfo.prevRefactorSuggestedRepo ? (
        <RefactorDetail
          refactorSuggestedRepo={refactorSuggestedRepoInfo.prevRefactorSuggestedRepo}
        />
      ) : null}
    </FeatureSection>
  );
}

export default RefactorCard;
