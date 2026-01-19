export const getContributionsCollectionQuery = (from: string, to: string) => `
query {
  viewer {
    contributionsCollection(from: "${from}", to: "${to}") {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        restrictedContributionsCount
        contributionCalendar{
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              contributionLevel
            }
          }
        }
        commitContributionsByRepository(maxRepositories: 10) {
          repository {
            name
            owner {
              login
            }
            url
          }
          contributions(first: 10) {
            nodes {
              occurredAt
              commitCount
            }
          }
        }
        pullRequestContributions(first: 20, orderBy: {direction: DESC}) {
          nodes {
            occurredAt
            pullRequest {
              title
              url
              state
              createdAt
              mergedAt
              closed
              repository {
                name
                owner {
                  login
                }
              }
            }
          }
        }
      }
  }
}
`;
