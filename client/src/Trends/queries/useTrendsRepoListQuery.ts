import { queryOptions } from '@tanstack/react-query';
import { getTrendsRepoList } from '@shared/apis/repo';
import { getMonthRange } from '@shared/utils/date';
import { getDestructuredTrendsRepoList } from '../utils/trendsRepoListHelper';
import { trendsRepoListQueryKeys } from './queryKeys';

const mostUsedLanguage = 'JavaScript';

export const trendsRepoListQueryOptions = () =>
  queryOptions({
    queryKey: trendsRepoListQueryKeys.list(mostUsedLanguage),
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getTrendsRepoList(mostUsedLanguage, getMonthRange());
      return getDestructuredTrendsRepoList(data);
    },
  });
