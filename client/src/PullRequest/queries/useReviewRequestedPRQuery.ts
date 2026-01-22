import { infiniteQueryOptions } from '@tanstack/react-query';
import { getReviewRequestedPRs } from '@shared/apis/pullrequest';
import { pullRequestQueryKeys } from './queryKeys';
import { mockPullRequests } from '../mocks/mockPullRequests';

const USE_MOCK_DATA = true; // Set to true for development/testing

export const reviewRequestedPRsInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: pullRequestQueryKeys.reviewRequested(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async ({ pageParam = 1 }) => {
      // Use mock data for development/testing
      if (USE_MOCK_DATA) {
        return {
          pullRequests: mockPullRequests,
          nextPage: pageParam + 1,
          hasMore: false,
        };
      }

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
