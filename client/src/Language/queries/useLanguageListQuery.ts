import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLanguageList } from '@shared/apis/language';
import {
  getDestructuredLanguageList,
  getMergedLanguageList,
  getSortedLanguageList,
} from '../utils/languageHelper';

const useLanguageListQuery = () => {
  const { data: languageList } = useQuery({
    queryKey: ['languageList'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getLanguageList();

      const destructuredLanguageList = getDestructuredLanguageList(data);
      const mergedLanguageList = getMergedLanguageList(
        destructuredLanguageList
      );
      return getSortedLanguageList(mergedLanguageList);
    },
  });

  const mostUsedLanguage = useMemo(() => {
    return {
      name: Object.keys(languageList ?? {})[0] ?? '',
      lines: Object.values(languageList ?? {}).map(Number)[0] ?? 0,
    };
  }, [languageList]);

  return { languageList, mostUsedLanguage };
};

export default useLanguageListQuery;
