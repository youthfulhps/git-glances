import { useQuery } from '@tanstack/react-query';
import { getRepo } from '@shared/apis/repo';
import useInput from '@shared/hooks/useInput';
import useDebounce from '@shared/hooks/useDebounce';
import useRepoRecoilState from '@shared/hooks/useRepoRecoilState';
import { AtomRepoState } from '@shared/atoms/types';
import { getDestructuredRepo } from '../utils/dailyRepoHelper';
import { dailyRepoAtom } from '../atoms';

const useDailyRepoQuery = () => {
  const {
    prevRepoState,
    updateAtomRepoState,
    generateUpdatedRepoState,
    resetAtomRepoState,
  } = useRepoRecoilState(dailyRepoAtom);

  const { value, onChange } = useInput(prevRepoState.prevRepo?.name ?? '');
  const debouncedSearchValue = useDebounce(value, 300);

  const { data: dailyRepoState } = useQuery({
    queryKey: ['repo', debouncedSearchValue],
    suspense: false,
    enabled: !!debouncedSearchValue,
    queryFn: async () => {
      const { data } = await getRepo(debouncedSearchValue);
      const repo = getDestructuredRepo(data);

      return generateUpdatedRepoState(repo);
    },
  });

  return {
    searchInput: value,
    onChange,
    resetAtomRepoState,
    updateAtomRepoState,
    dailyRepoState: dailyRepoState as AtomRepoState,
  };
};

export default useDailyRepoQuery;
