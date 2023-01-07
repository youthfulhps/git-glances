import { NestedFieldResponse } from '@shared/apis/types';
import { Repository, RepositoryNodes } from '@shared/apis/repo';

export type GetDestructuredRepoList = (
  rawRepoList: NestedFieldResponse<RepositoryNodes>
) => Repository[];

export type GetRefactorSuggestedRepoIndex = (repoList: Repository[]) => number;
