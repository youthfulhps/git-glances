import { RecoilState, useRecoilState } from 'recoil';
import { Repository } from '@shared/apis/repo';
import moment from 'moment/moment';
import { isToday } from '@shared/utils/date';
import { AtomRepoState } from '@shared/atoms/types';
import { useEffect, useState } from 'react';

const useRepoRecoilState = (atomRepo: RecoilState<AtomRepoState>) => {
  const [prevRepoState, setPrevRepoState] = useRecoilState(atomRepo);

  const [hasPrevRepo, setHasPrevRepo] = useState(false);

  useEffect(() => {
    setHasPrevRepo(!!prevRepoState.prevRepo);
  }, [prevRepoState.prevRepo]);

  const generateUpdatedRepoState = (repo: Repository): AtomRepoState => {
    return {
      prevRepo: repo,
      updatedAt: moment().format(),
      hasTodayContribution: isToday(repo.pushedAt),
    };
  };

  const getUpdatedRepo = (repo: Repository) => {
    const { prevRepo, updatedAt } = prevRepoState;

    if (prevRepo && updatedAt && isToday(updatedAt)) {
      return prevRepo;
    }

    return repo;
  };

  const updateAtomRepoState = (repo: Repository) => {
    const updatedRepo = getUpdatedRepo(repo);
    const updatedRepoState = generateUpdatedRepoState(updatedRepo);
    setPrevRepoState(updatedRepoState);
  };

  const resetAtomRepoState = () => {
    setPrevRepoState({
      prevRepo: null,
      updatedAt: '',
      hasTodayContribution: false,
    });
  };

  return {
    prevRepoState,
    updateAtomRepoState,
    generateUpdatedRepoState,
    resetAtomRepoState,
    hasPrevRepo,
  };
};

export default useRepoRecoilState;
