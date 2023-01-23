import { ListSearchNestedFieldResponse } from '@shared/apis/types';
import { TrendsRepository } from '@shared/apis/repo';

export type GetDestructuredTrendsRepoList = (
  rawTrendsRepoList: ListSearchNestedFieldResponse<TrendsRepository>
) => TrendsRepository[];
