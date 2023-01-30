import { useQuery } from '@tanstack/react-query';
import { ContributionsCollection, getContributionsCollection } from '@shared/apis/contribution';
import { AxiosError } from 'axios';
import { getDestructuredContributionsCollection } from '../utils/contributionHelper';

const useContributionsCollectionQuery = (from: string, to: string) => {
  const { data: contributionsCollection } = useQuery<ContributionsCollection, AxiosError>({
    queryKey: ['contributionsCollection', from, to],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getContributionsCollection(from, to);
      const destructuredContributionsCollection = getDestructuredContributionsCollection(data);

      return destructuredContributionsCollection;
    },
  });

  return contributionsCollection as ContributionsCollection;
};

export default useContributionsCollectionQuery;
