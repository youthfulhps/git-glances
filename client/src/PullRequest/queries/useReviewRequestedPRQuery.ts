import { infiniteQueryOptions } from '@tanstack/react-query';
import { getReviewRequestedPRs } from '@shared/apis/pullrequest';
import { pullRequestQueryKeys } from './queryKeys';

export const reviewRequestedPRsInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: pullRequestQueryKeys.reviewRequested(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await getReviewRequestedPRs({ page: pageParam, perPage: 30 });

      return {
        pullRequests: data.items,
        nextPage: pageParam + 1,
        hasMore: data.items.length >= 30,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
  });
