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
  const { data: mostUsedLanguage } = useSuspenseQuery<MostUsedLanguage[], AxiosError>({
    queryKey: ['languageList'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getLanguageList();

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

  return mostUsedLanguage;
};

export default useMostUsedLanguageQuery;
