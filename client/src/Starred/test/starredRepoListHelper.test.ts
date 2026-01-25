import { getDestructuredStarredRepoList } from '../utils/starredRepoListHelper';
import { mockedRawStarredRepoList, mockedDestructuredStarredRepoList } from './mocks';

describe('starredRepoListHelper', () => {
  it('getDestructuredStarredRepoList returns starred repositories from nested object', () => {
    expect(getDestructuredStarredRepoList(mockedRawStarredRepoList)).toStrictEqual(
      mockedDestructuredStarredRepoList,
    );
  });
});
