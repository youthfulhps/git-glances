import { GetContributionLevelBackgroundClass } from './types';

export const getContributionLevelBackgroundClass: GetContributionLevelBackgroundClass =
  (totalContributions) => {
    if (totalContributions >= 18) return 'bg-contribution-400';
    if (totalContributions >= 11) return 'bg-contribution-300';
    if (totalContributions >= 5) return 'bg-contribution-200';
    if (totalContributions >= 1) return 'bg-contribution-100';
    return 'bg-contribution-000';
  };
