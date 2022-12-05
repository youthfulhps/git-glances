import { GetContributionLevel, GetDestructuredContribution } from './types';

export const getDestructuredContribution: GetDestructuredContribution = (
  contribution
) => {
  return contribution?.data?.viewer?.contributionsCollection;
};

export const getContributionLevel: GetContributionLevel = (
  totalCommitContributions
) => {
  if (totalCommitContributions >= 18) return 400;
  if (totalCommitContributions >= 11) return 300;
  if (totalCommitContributions >= 5) return 200;
  if (totalCommitContributions >= 1) return 100;
  return 0;
};
