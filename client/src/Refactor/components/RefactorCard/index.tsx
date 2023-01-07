import React from 'react';
import EnhancedSection from '@layout/components/EnhancedSection';
import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react';
import { RefactorSuggestedRepoInfo } from '../../atoms/types';
import RefactorDetail from './RefactorDetail';

type RefactorCardProps = {
  refactorSuggestedRepoInfo: RefactorSuggestedRepoInfo;
};

function RefactorCard({ refactorSuggestedRepoInfo }: RefactorCardProps) {
  const summaryIcon = refactorSuggestedRepoInfo.hasTodayCommit ? (
    <CheckCircleFillIcon size={48} className="fill-emerald-500" />
  ) : (
    <XCircleFillIcon size={48} className="fill-red-400" />
  );

  return (
    <EnhancedSection
      summary={summaryIcon}
      summaryType="icon"
      gridArea="Refactor"
    >
      {refactorSuggestedRepoInfo.prevRefactorSuggestedRepo ? (
        <RefactorDetail
          refactorSuggestedRepo={
            refactorSuggestedRepoInfo.prevRefactorSuggestedRepo
          }
        />
      ) : null}
    </EnhancedSection>
  );
}

export default RefactorCard;
