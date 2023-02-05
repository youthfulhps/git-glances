import { useQuery } from '@tanstack/react-query';
import { getTrendsRepoList, TrendsRepository } from '@shared/apis/repo';
import { useRecoilValue } from 'recoil';
import { getMonthRange } from '@shared/utils/date';
import { getDestructuredTrendsRepoList } from '../utils/trendsRepoListHelper';
import { mostUsedLanguageAtom } from '../../Language/atoms';

const useTrendsRepoListQuery = () => {
  const mostUsedLanguage = useRecoilValue(mostUsedLanguageAtom);

  const { data: trendsRepoList } = useQuery({
    queryKey: ['trendsRepoList', mostUsedLanguage],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getTrendsRepoList(mostUsedLanguage, getMonthRange());
      const destructuredTrendsRepoList = getDestructuredTrendsRepoList(data);

      return destructuredTrendsRepoList;
    },
  });

  return trendsRepoList as TrendsRepository[];
};

export default useTrendsRepoListQuery;
