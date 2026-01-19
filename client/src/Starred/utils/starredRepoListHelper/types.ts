import { AsyncNestedAxiosResponse } from '@shared/apis/types';
import { TrendsRepository } from '@shared/apis/repo';

export type GetDestructuredStarredRepoList = (
  rawStarredRepoList: AsyncNestedAxiosResponse<{
    viewer: {
      starredRepositories: {
        edges: Array<{
          node: TrendsRepository;
        }>;
      };
    };
  }>
) => TrendsRepository[];
