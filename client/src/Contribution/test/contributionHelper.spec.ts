import { getDestructuredContributionsCollection } from '../utils/contributionHelper';
import { mockedContribution, mockedContributionCollection } from './mocks';

describe('contributionHelper', () => {
  it('getDestructuredContributionsCollection returns contribution object from nested object', () => {
    expect(getDestructuredContributionsCollection(mockedContribution)).toStrictEqual(
      mockedContributionCollection
    );
  });
});
