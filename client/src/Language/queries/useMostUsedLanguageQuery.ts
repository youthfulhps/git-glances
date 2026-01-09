import { useSuspenseQuery } from '@tanstack/react-query';
import { getLanguageList } from '@shared/apis/language';
import { AxiosError } from 'axios';
import {
  getDestructuredLanguageList,
  getMergedLanguageList,
  getSortedLanguageList,
} from '../utils/languageHelper';

export type MostUsedLanguage = {
  name: string;
  lines: number;
};

const useMostUsedLanguageQuery = () => {
  const { data: mostUsedLanguage } = useSuspenseQuery<MostUsedLanguage, AxiosError>({
    queryKey: ['languageList'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getLanguageList();

      const destructuredLanguageList = getDestructuredLanguageList(data);
      const mergedLanguageList = getMergedLanguageList(destructuredLanguageList);
      const sortedLanguageList = getSortedLanguageList(mergedLanguageList);

      return {
        name: Object.keys(sortedLanguageList ?? {})[0] ?? '',
        lines: Object.values(sortedLanguageList ?? {}).map(Number)[0] ?? 0,
      };
    },
  });

  return mostUsedLanguage;
};

export default useMostUsedLanguageQuery;
