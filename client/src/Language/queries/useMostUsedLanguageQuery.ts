import { getLanguageList } from '@shared/apis/language';
import {
  getDestructuredLanguageList,
  getMergedLanguageList,
  getSortedLanguageList,
} from '../utils/languageHelper';
import { languageQueryKeys } from './queryKeys';

import { queryOptions } from '@tanstack/react-query';

export type MostUsedLanguage = {
  name: string;
  lines: number;
};

export const mostUsedLanguageQueryOptions = queryOptions({
  queryKey: languageQueryKeys.list(),
  staleTime: 1000 * 60 * 60 * 24,
  queryFn: async () => {
    const { data } = await getLanguageList();
    return data;
  },
  select: (data) => {
    const destructuredLanguageList = getDestructuredLanguageList(data);
    const mergedLanguageList = getMergedLanguageList(destructuredLanguageList);
    const sortedLanguageList = getSortedLanguageList(mergedLanguageList);

    return Object.entries(sortedLanguageList)
      .slice(0, 3)
      .map(([key, value]) => ({
        name: key,
        lines: value,
      }));
  },
});
