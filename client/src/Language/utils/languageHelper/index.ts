import {
  LanguageList,
  GetMergedLanguageList,
  GetDestructuredLanguageList,
  SortedLanguageList,
  GetLanguageColor,
} from './types';

import { languageDetailList } from '../../constants/languageDetailList';

export const getDestructuredLanguageList: GetDestructuredLanguageList = (
  rawLanguageList
) => {
  return rawLanguageList?.data?.viewer?.repositories?.nodes ?? {};
};

export const getMergedLanguageList: GetMergedLanguageList = (
  languageNodeList
) => {
  const mergedLanguageList: LanguageList = {};

  languageNodeList.forEach((languageNode) => {
    languageNode.languages.edges.forEach((edge: any) => {
      const {
        node: { name },
        size,
      } = edge;

      if (mergedLanguageList[name]) {
        mergedLanguageList[name] += size;
      } else {
        mergedLanguageList[name] = size;
      }
    });
  });

  return mergedLanguageList;
};

export const getSortedLanguageList: SortedLanguageList = (
  mergedLanguageList
) => {
  return Object.entries(mergedLanguageList)
    .sort(([, a], [, b]) => Number(b) - Number(a))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
};

export const getLanguageColor: GetLanguageColor = (language) => {
  return languageDetailList[language]?.color ?? '#000000';
};
