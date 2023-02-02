import React from 'react';
import { Repository } from '@shared/apis/repo';
import RepositoryDetail from '@shared/components/Details/Repository';

type RefactorDetailProps = {
  refactorSuggestedRepo: Repository;
};

function RefactorDetail({ refactorSuggestedRepo }: RefactorDetailProps) {
  return <RepositoryDetail repository={refactorSuggestedRepo} />;
}

export default RefactorDetail;
