import { useState } from 'react';
import { Repository } from '@shared/apis/repo';
import moment from 'moment/moment';
import { isToday } from '@shared/utils/date';
import { AtomRepoState } from '@shared/atoms/types';

const useRepoState = () => {
  const [prevRepoState, setPrevRepoState] = useState<AtomRepoState>({
    prevRepo: null,
    updatedAt: '',
    hasTodayContribution: false,
  });

  const generateUpdatedRepoState = (repo: Repository): AtomRepoState => {
    return {
      prevRepo: repo,
      updatedAt: moment().format(),
      hasTodayContribution: repo?.pushedAt ? isToday(repo.pushedAt) : false,
    };
  };

  const updateAtomRepoState = (repo: Repository) => {
    const updatedRepoState = generateUpdatedRepoState(repo);
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
  };
};

export default useRepoState;
