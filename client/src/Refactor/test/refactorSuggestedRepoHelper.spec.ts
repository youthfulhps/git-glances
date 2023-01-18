import {
  getDestructuredRepoList,
  getRefactorSuggestedRepoIndex,
} from '../utils/refactorSuggestedRepoHelper';

import { mockedRawRepoList, mockedDestructuredRepoList } from './mocks';

describe('refactorSuggestedRepoHelper는 전처리된 레포지토리 결과를 반환한다.', () => {
  it('getDestructuredRepoList는 중첩된 객체에서 레포지토리들에 대한 정보를 반환한다.', () => {
    expect(getDestructuredRepoList(mockedRawRepoList)).toStrictEqual(mockedDestructuredRepoList);
  });

  it('getRefactorSuggestedRepoIndex는 레포지토리들 중 하나를 가르키는 랜덤한 인덱스를 반환한다.', () => {
    expect(getRefactorSuggestedRepoIndex(mockedDestructuredRepoList).toString()).toMatch(/^[0-4]$/);
    expect(getRefactorSuggestedRepoIndex(mockedDestructuredRepoList).toString()).not.toMatch(
      /^[5-9]$/
    );
  });
});
