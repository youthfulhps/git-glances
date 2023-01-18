type ContributionLevel = '000' | '100' | '200' | '300' | '400';

type ContributionLevelBackgroundClass = `bg-contribution-${ContributionLevel}/[0.5]`;

export type GetContributionLevelBackgroundClass = (
  totalContributions: number
) => ContributionLevelBackgroundClass;
