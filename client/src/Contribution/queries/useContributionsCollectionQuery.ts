import { useSuspenseQuery } from '@tanstack/react-query';
import { ContributionsCollection, getContributionsCollection } from '@shared/apis/contribution';
import { AxiosError } from 'axios';
import { getDestructuredContributionsCollection } from '../utils/contributionHelper';

const useContributionsCollectionQuery = (from: string, to: string) => {
  const { data: contributionsCollection } = useSuspenseQuery<ContributionsCollection, AxiosError>({
    queryKey: ['contributionsCollection', from, to],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getContributionsCollection(from, to);
      return getDestructuredContributionsCollection(data);
    },
  });

  return contributionsCollection;
};

export default useContributionsCollectionQuery;
