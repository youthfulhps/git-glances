import { getContributionLevelBackgroundClass } from '../utils/contributionStyleHelper';

describe('contributionStyleHelper', () => {
  it('getContributionLevelBackgroundClass returns background color class for contribution level', () => {
    expect(getContributionLevelBackgroundClass(0)).toBe('bg-contribution-000/[0.5]');
    expect(getContributionLevelBackgroundClass(3)).toBe('bg-contribution-100/[0.5]');
    expect(getContributionLevelBackgroundClass(7)).toBe('bg-contribution-200/[0.5]');
    expect(getContributionLevelBackgroundClass(17)).toBe('bg-contribution-300/[0.5]');
    expect(getContributionLevelBackgroundClass(21)).toBe('bg-contribution-400/[0.5]');
  });
});
