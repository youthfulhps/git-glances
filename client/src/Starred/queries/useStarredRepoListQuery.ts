import { infiniteQueryOptions } from '@tanstack/react-query';
import { getStarredRepoList } from '@shared/apis/repo';
import { getDestructuredStarredRepoList } from '../utils/starredRepoListHelper';
import { starredRepoListQueryKeys } from './queryKeys';

export const starredRepoListQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: starredRepoListQueryKeys.list(),
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async ({ pageParam }) => {
      const { data } = await getStarredRepoList(pageParam);
      const pageInfo = data.data.viewer.starredRepositories.pageInfo;
      const repositories = getDestructuredStarredRepoList(data);

      return {
        repositories,
        pageInfo,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined;
    },
    initialPageParam: undefined as string | undefined,
  });
