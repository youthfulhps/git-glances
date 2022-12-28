import {
  LanguageNode,
  LanguageNodes,
  MergedLanguages,
} from '@shared/apis/language';
import { NestedFieldResponse } from '@shared/apis/types';

export type GetMergedLanguageList = (
  languageNodeList: LanguageNode[]
) => MergedLanguages;

export type GetDestructuredLanguageList = (
  rawLanguageList: NestedFieldResponse<LanguageNodes>
) => LanguageNode[];

export type SortedLanguageList = (
  languageList: MergedLanguages
) => MergedLanguages;
