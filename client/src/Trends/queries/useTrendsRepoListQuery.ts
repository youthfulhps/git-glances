import { useSuspenseQuery } from '@tanstack/react-query';
import { getTrendsRepoList, TrendsRepository } from '@shared/apis/repo';
import { getMonthRange } from '@shared/utils/date';
import { AxiosError } from 'axios';
import { getDestructuredTrendsRepoList } from '../utils/trendsRepoListHelper';
import useMostUsedLanguageQuery from '../../Language/queries/useMostUsedLanguageQuery';

const useTrendsRepoListQuery = () => {
  const mostUsedLanguageList = useMostUsedLanguageQuery();
  const mostUsedLanguage = mostUsedLanguageList[0]?.name || '';

  const { data: trendsRepoList } = useSuspenseQuery<TrendsRepository[], AxiosError>({
    queryKey: ['trendsRepoList', mostUsedLanguage],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getTrendsRepoList(mostUsedLanguage, getMonthRange());
      return getDestructuredTrendsRepoList(data);
    },
  });

  return trendsRepoList;
};

export default useTrendsRepoListQuery;
