import { useQuery } from '@tanstack/react-query';
import { getTrendsRepoList, TrendsRepository } from '@shared/apis/repo';
import { getDestructuredTrendsRepoList } from '../utils/trendsRepoListHelper';

const useTrendsRepoListQuery = () => {
  const { data: trendsRepoList } = useQuery({
    queryKey: ['trendsRepoList'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getTrendsRepoList();
      const destructuredTrendsRepoList = getDestructuredTrendsRepoList(data);

      return destructuredTrendsRepoList;
    },
  });

  return trendsRepoList as TrendsRepository[];
};

export default useTrendsRepoListQuery;
