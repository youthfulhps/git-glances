import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getDiffDaysFromNow } from '@shared/utils/date';
import Button from '@shared/components/Button';

type RepoMaintenanceSuggestionProps = {
  repoSuggestedMaintenance: any;
};

const StyledRepoMaintenanceSuggestion = styled.div`
  ${tw`flex flex-col`};
  ${tw`h-full w-full p-3 rounded-2xl`};
  ${tw`text-zinc-200 drop-shadow-lg`};
  ${tw`bg-zinc-700`}
`;

const SuggestionComment = styled.h3`
  ${tw`font-bold text-base`};
  ${tw`mb-2`}
`;

const DiffDaysFromLastCommit = styled.h4`
  ${tw`text-sm`};
`;

function RepoSuggestedMaintenance({
  repoSuggestedMaintenance,
}: RepoMaintenanceSuggestionProps) {
  return (
    <StyledRepoMaintenanceSuggestion>
      <SuggestionComment>
        {`오늘은 ${repoSuggestedMaintenance.name} 개선을 추천해요!`}
      </SuggestionComment>
      <DiffDaysFromLastCommit>
        {`마지막 커밋이후 ${getDiffDaysFromNow(
          repoSuggestedMaintenance.pushedAt
        )}일이 지났어요.`}
      </DiffDaysFromLastCommit>
      <a
        href={repoSuggestedMaintenance.url}
        target="_blank"
        rel="noreferrer"
        className="mt-auto"
      >
        <Button>저장소로 바로가기</Button>
      </a>
    </StyledRepoMaintenanceSuggestion>
  );
}

export default RepoSuggestedMaintenance;
