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
        }
      }
  }
}
`;
