import { ContributionsCollection } from '@shared/apis/contribution';
import { NestedFieldResponse } from '@shared/apis/types';

export const mockedContribution: NestedFieldResponse<ContributionsCollection> =
  {
    data: {
      viewer: {
        contributionsCollection: {
          totalCommitContributions: 1,
          totalIssueContributions: 0,
          totalPullRequestContributions: 2,
          totalPullRequestReviewContributions: 0,
          restrictedContributionsCount: 0,
          contributionCalendar: { totalContributions: 3 },
        },
      },
    },
  };

export const mockedContributionCollection: ContributionsCollection = {
  totalCommitContributions: 1,
  totalIssueContributions: 0,
  totalPullRequestContributions: 2,
  totalPullRequestReviewContributions: 0,
  restrictedContributionsCount: 0,
  contributionCalendar: { totalContributions: 3 },
};
