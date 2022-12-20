import { getDestructuredContribution } from '../utils/contributionHelper';
import { mockedContribution, mockedContributionCollection } from './mocks';

describe('contributionHelper는 기여도에 대한 전처리된 결과를 반환한다.', () => {
  it('getDestructuredContribution는 중첩된 객체에서 기여도 객체를 반환한다.', () => {
    expect(getDestructuredContribution(undefined)).toStrictEqual({});
    expect(getDestructuredContribution(null)).toStrictEqual({});
    expect(getDestructuredContribution({})).toStrictEqual({});
    expect(getDestructuredContribution(mockedContribution)).toStrictEqual(
      mockedContributionCollection
    );
  });
});
