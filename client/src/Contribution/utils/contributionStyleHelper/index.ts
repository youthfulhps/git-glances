import { GetContributionLevelBackgroundClass } from './types';

export const getContributionLevelBackgroundClass: GetContributionLevelBackgroundClass = (
  totalContributions
) => {
  if (totalContributions >= 18) return 'bg-contribution-400/[0.5]';
  if (totalContributions >= 11) return 'bg-contribution-300/[0.5]';
  if (totalContributions >= 5) return 'bg-contribution-200/[0.5]';
  if (totalContributions >= 1) return 'bg-contribution-100/[0.5]';
  return 'bg-contribution-000/[0.5]';
};
