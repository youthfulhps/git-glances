import { getDestructuredTrendsRepoList } from '../utils/trendsRepoListHelper';
import { mockedRawTrendsRepoList, mockedDestructuredTrendsRepoList } from './mocks';

describe('trendsRepoListHelper는 전처리된 트렌드 레포지토리 결과를 반환한다.', () => {
  it('getDestructuredTrendsRepoList는 중첩된 객체에서 트렌드 레포지토리들에 대한 정보를 반환한다.', () => {
    expect(getDestructuredTrendsRepoList(mockedRawTrendsRepoList)).toStrictEqual(
      mockedDestructuredTrendsRepoList
    );
  });
});
