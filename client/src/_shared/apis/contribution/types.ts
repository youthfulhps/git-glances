import { AsyncAxiosResponse } from '@shared/apis/types';

export type ContributionsCollection = {
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: {
    totalContributions: number;
  };
};

export type GetContributionsCollection = (
  from: string,
  to: string
) => AsyncAxiosResponse<ContributionsCollection>;
