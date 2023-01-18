import { getContributionLevelBackgroundClass } from '../utils/contributionStyleHelper';

describe('contributionStyleHelper는 기여도에 대한 스타일을 반환한다.', () => {
  it('getContributionLevelBackgroundClass는 기여도에 대한 배경 색상 클래스를 반환한다.', () => {
    expect(getContributionLevelBackgroundClass(0)).toBe('bg-contribution-000/[0.5]');
    expect(getContributionLevelBackgroundClass(3)).toBe('bg-contribution-100/[0.5]');
    expect(getContributionLevelBackgroundClass(7)).toBe('bg-contribution-200/[0.5]');
    expect(getContributionLevelBackgroundClass(17)).toBe('bg-contribution-300/[0.5]');
    expect(getContributionLevelBackgroundClass(21)).toBe('bg-contribution-400/[0.5]');
  });
});
