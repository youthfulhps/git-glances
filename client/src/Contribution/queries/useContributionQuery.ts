import { useQuery } from '@tanstack/react-query';
import { getContribution } from '@shared/apis/contribution';
import { getDestructuredContribution } from '../utils/contributionHelper';

const useContributionQuery = (from: string, to: string) => {
  const { data: contribution } = useQuery({
    queryKey: ['contribution', from, to],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getContribution(from, to);
      const destructuredContribution = getDestructuredContribution(data);

      return destructuredContribution;
    },
  });

  return { contribution };
};

export default useContributionQuery;
