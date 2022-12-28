import {
  getDestructuredLanguageList,
  getMergedLanguageList,
  getSortedLanguageList,
} from '../utils/languageHelper';

import {
  mockedRawLanguageList,
  mockedDestructuredLanguageList,
  mockedMergedLanguageList,
} from './mocks';

describe('languageHelper는 최근 레포지토리들의 언어 사용량에 대한 전처리된 결과를 반환한다.', () => {
  it('getDestructuredLanguageList는 중첩된 객체에서 언어 사용량 객체를 반환한다.', () => {
    expect(getDestructuredLanguageList(mockedRawLanguageList)).toStrictEqual(
      mockedDestructuredLanguageList
    );
  });

  it('getMergedLanguageList는 레포지토리들의 언어별 사용량을 병합하여 반환한다.', () => {
    expect(getMergedLanguageList([])).toStrictEqual({});
    expect(getMergedLanguageList(mockedDestructuredLanguageList)).toStrictEqual(
      mockedMergedLanguageList
    );
  });

  it('getSortedLanguageList는 병합된 언어별 사용량을 기준으로 내림차순 정렬하여 반환한다.', () => {
    expect(getSortedLanguageList({})).toStrictEqual({});
    expect(getSortedLanguageList(mockedMergedLanguageList)).toStrictEqual(
      mockedMergedLanguageList
    );
  });
});
