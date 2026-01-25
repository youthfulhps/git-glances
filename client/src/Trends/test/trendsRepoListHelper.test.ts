import { getDestructuredTrendsRepoList } from '../utils/trendsRepoListHelper';
import { mockedRawTrendsRepoList, mockedDestructuredTrendsRepoList } from './mocks';

describe('trendsRepoListHelper', () => {
  it('getDestructuredTrendsRepoList returns trend repositories from nested object', () => {
    expect(getDestructuredTrendsRepoList(mockedRawTrendsRepoList)).toStrictEqual(
      mockedDestructuredTrendsRepoList
    );
  });
});
