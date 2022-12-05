export const getContributionQuery = (from: string, to: string) => `
query {
  viewer {
    contributionsCollection(from: "${from}", to: "${to}") {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
  }
}
`;
