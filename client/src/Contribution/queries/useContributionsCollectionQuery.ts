import { useQuery } from '@tanstack/react-query';
import { getContributionsCollection } from '@shared/apis/contribution';
import { getDestructuredContribution } from '../utils/contributionHelper';

const useContributionsCollectionQuery = (from: string, to: string) => {
  const { data: contribution } = useQuery({
    queryKey: ['contribution', from, to],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getContributionsCollection(from, to);
      const destructuredContribution = getDestructuredContribution(data);

      return destructuredContribution;
    },
  });

  return { contribution };
};

export default useContributionsCollectionQuery;
