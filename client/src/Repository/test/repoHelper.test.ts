import {
  getDestructuredRepoList,
  getRepoSuggestedMaintenanceIndex,
} from '../utils/repoHelper';

import { mockedRawRepoList, mockedDestructuredRepoList } from './mocks';

describe('repoHelper는 레포지토리들에 대한 전처리된 결과를 반환한다.', () => {
  it('getDestructuredRepoList는 중첩된 객체에서 레포지토리들에 대한 정보를 반환한다.', () => {
    expect(getDestructuredRepoList(undefined)).toStrictEqual({});
    expect(getDestructuredRepoList(null)).toStrictEqual({});
    expect(getDestructuredRepoList({})).toStrictEqual({});
    expect(getDestructuredRepoList(mockedRawRepoList)).toStrictEqual(
      mockedDestructuredRepoList
    );
  });

  it('getRepoSuggestedMaintenanceIndex는 레포지토리들 중 하나를 가르키는 랜덤한 인덱스를 반환한다.', () => {
    expect(
      getRepoSuggestedMaintenanceIndex(mockedDestructuredRepoList).toString()
    ).toMatch(/^[0-4]$/);
    expect(
      getRepoSuggestedMaintenanceIndex(mockedDestructuredRepoList).toString()
    ).not.toMatch(/^[5-9]$/);
  });
});
