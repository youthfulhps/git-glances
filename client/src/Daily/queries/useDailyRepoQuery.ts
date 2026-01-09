import { useQuery } from '@tanstack/react-query';
import { getRepo, Repository } from '@shared/apis/repo';
import useInput from '@shared/hooks/useInput';
import useDebounce from '@shared/hooks/useDebounce';
import useRepoState from '@shared/hooks/useRepoRecoilState';
import { AtomRepoState } from '@shared/atoms/types';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getDestructuredRepo } from '../utils/dailyHelper';

const useDailyRepoQuery = () => {
  const { prevRepoState, updateAtomRepoState, generateUpdatedRepoState, resetAtomRepoState } =
    useRepoState();

  const { value, setValue, onChange } = useInput(prevRepoState.prevRepo?.name ?? '');

  const debouncedSearchValue = useDebounce(value, 700) || prevRepoState.prevRepo?.name || '';

  const [tmpDailyRepoState, setTmpDailyRepoState] = useState<AtomRepoState | null>(null);
  const [isPrivateRepo, setIsPrivateRepo] = useState<boolean>(false);

  const { data: dailyRepo } = useQuery<Repository, AxiosError, Repository>({
    queryKey: ['repo', debouncedSearchValue],
    enabled: !!debouncedSearchValue,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getRepo(debouncedSearchValue);
      const repo = getDestructuredRepo(data);

      if (!repo.defaultBranchRef) {
        setIsPrivateRepo(true);
        setValue('');
      }

      return repo;
    },
  });

  useEffect(() => {
    if (prevRepoState.prevRepo && dailyRepo) {
      updateAtomRepoState(dailyRepo);
    }

    if (dailyRepo) {
      setTmpDailyRepoState(generateUpdatedRepoState(dailyRepo));
    }
    // eslint-disable-next-line
  }, [dailyRepo]);

  const resetTmpDailyRepoState = () => {
    setValue('');
    setTmpDailyRepoState(null);
  };

  const resetDailyRepoState = () => {
    resetTmpDailyRepoState();
    resetAtomRepoState();
  };

  return {
    searchInput: value,
    onChange,
    resetDailyRepoState,
    updateAtomRepoState,
    tmpDailyRepoState,
    resetTmpDailyRepoState,
    isPrivateRepo,
    setIsPrivateRepo,
    prevRepoState,
  };
};

export default useDailyRepoQuery;
