import { useQuery } from '@tanstack/react-query';
import { getLanguageList } from '@shared/apis/language';
import {
  getDestructuredLanguageList,
  getMergedLanguageList,
  getSortedLanguageList,
} from '../utils/languageHelper';

const useMostUsedLanguageQuery = () => {
  const { data: mostUsedLanguage } = useQuery({
    queryKey: ['languageList'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getLanguageList();

      const destructuredLanguageList = getDestructuredLanguageList(data);
      const mergedLanguageList = getMergedLanguageList(
        destructuredLanguageList
      );
      const sortedLanguageList = getSortedLanguageList(mergedLanguageList);

      return {
        name: Object.keys(sortedLanguageList ?? {})[0] ?? '',
        lines: Object.values(sortedLanguageList ?? {}).map(Number)[0] ?? 0,
      };
    },
  });

  return mostUsedLanguage as { name: string; lines: number };
};

export default useMostUsedLanguageQuery;
