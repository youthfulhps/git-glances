import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getLanguageList } from '@shared/apis/language';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  getDestructuredLanguageList,
  getMergedLanguageList,
  getSortedLanguageList,
} from '../utils/languageHelper';
import { mostUsedLanguageAtom } from '../atoms';

export type MostUsedLanguage = {
  name: string;
  lines: number;
};

const useMostUsedLanguageQuery = () => {
  const setMostUsedLanguage = useSetRecoilState(mostUsedLanguageAtom);

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

  useEffect(() => {
    if (mostUsedLanguage) {
      setMostUsedLanguage(mostUsedLanguage.name);
    }
  }, [setMostUsedLanguage, mostUsedLanguage]);

  return mostUsedLanguage;
};

export default useMostUsedLanguageQuery;
