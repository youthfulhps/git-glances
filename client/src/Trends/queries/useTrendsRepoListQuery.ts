import { infiniteQueryOptions } from '@tanstack/react-query';
import { getTrendsRepoList } from '@shared/apis/repo';
import { getMonthRange } from '@shared/utils/date';
import { getDestructuredTrendsRepoList } from '../utils/trendsRepoListHelper';
import { trendsRepoListQueryKeys } from './queryKeys';

export const trendsRepoListQueryOptions = (language: string) =>
  infiniteQueryOptions({
    queryKey: trendsRepoListQueryKeys.list(language),
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async ({ pageParam }) => {
      const { data } = await getTrendsRepoList(language, getMonthRange(), pageParam);
      const pageInfo = data.data.search.pageInfo;
      const repositories = getDestructuredTrendsRepoList(data);

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
