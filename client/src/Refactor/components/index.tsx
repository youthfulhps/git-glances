import React from 'react';
import RefactorCard from './RefactorCard';
import useRefactorSuggestedRepoQuery from '../queries/useRefactorSuggestedRepoQuery';

function Refactor() {
  const refactorSuggestedRepoInfo = useRefactorSuggestedRepoQuery();

  return <RefactorCard refactorSuggestedRepoInfo={refactorSuggestedRepoInfo} />;
}

export default Refactor;
