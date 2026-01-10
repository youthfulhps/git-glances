import { queryOptions } from '@tanstack/react-query';
import { getContributionsCollection } from '@shared/apis/contribution';
import { getDestructuredContributionsCollection } from '../utils/contributionHelper';
import { contributionsQueryKeys } from './querykeys';

export const contributionsQueryOptions = (from: string, to: string) =>
  queryOptions({
    queryKey: contributionsQueryKeys.list(from, to),
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getContributionsCollection(from, to);
      return data;
    },
    select: (data) => {
      return getDestructuredContributionsCollection(data);
    },
  });
