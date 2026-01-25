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

describe('languageHelper', () => {
  it('getDestructuredLanguageList returns language usage object from nested object', () => {
    expect(getDestructuredLanguageList(mockedRawLanguageList)).toStrictEqual(
      mockedDestructuredLanguageList
    );
  });

  it('getMergedLanguageList merges and returns language usage by repositories', () => {
    expect(getMergedLanguageList([])).toStrictEqual({});
    expect(getMergedLanguageList(mockedDestructuredLanguageList)).toStrictEqual(
      mockedMergedLanguageList
    );
  });

  it('getSortedLanguageList sorts merged language usage in descending order', () => {
    expect(getSortedLanguageList({})).toStrictEqual({});
    expect(getSortedLanguageList(mockedMergedLanguageList)).toStrictEqual(mockedMergedLanguageList);
  });
});
