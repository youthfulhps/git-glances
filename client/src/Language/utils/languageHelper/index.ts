import { LanguageEdge, MergedLanguages } from '@shared/apis/language';
import {
  GetMergedLanguageList,
  GetDestructuredLanguageList,
  SortedLanguageList,
} from './types';

export const getDestructuredLanguageList: GetDestructuredLanguageList = (
  rawLanguageList
) => {
  return rawLanguageList.data.viewer.repositories.nodes;
};

export const getMergedLanguageList: GetMergedLanguageList = (
  languageNodeList
) => {
  if (!languageNodeList || !languageNodeList.length) return {};

  const mergedLanguageList: MergedLanguages = {};

  languageNodeList.forEach((languageNode) => {
    languageNode.languages.edges.forEach((edge: LanguageEdge) => {
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
