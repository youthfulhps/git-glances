import { getLanguageList } from '@shared/apis/language';
import { getDestructuredLanguageList } from '../utils/languageHelper';
import { getLanguagesWithRepos } from '../utils/languageBoardHelper';
import { languageQueryKeys } from './queryKeys';
import { queryOptions } from '@tanstack/react-query';

export const languageListQueryOptions = queryOptions({
  queryKey: languageQueryKeys.list(),
  staleTime: 1000 * 60 * 60 * 24,
  queryFn: async () => {
    const { data } = await getLanguageList();
    return data;
  },
  select: (data) => {
    const repositories = getDestructuredLanguageList(data);
    return getLanguagesWithRepos(repositories);
  },
});
