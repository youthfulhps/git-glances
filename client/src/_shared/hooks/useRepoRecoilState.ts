import { RecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { Repository } from '@shared/apis/repo';
import moment from 'moment/moment';
import { isToday } from '@shared/utils/date';
import { AtomRepoState } from '@shared/atoms/types';

const useRepoRecoilState = (atomRepo: RecoilState<AtomRepoState>) => {
  const [prevRepoState, setPrevRepoState] = useRecoilState(atomRepo);
  const resetAtomRepoState = useResetRecoilState(atomRepo);

  const generateUpdatedRepoState = (repo: Repository): AtomRepoState => {
    return {
      prevRepo: repo,
      updatedAt: moment().format(),
      hasTodayContribution: repo?.pushedAt ? isToday(repo.pushedAt) : false,
    };
  };

  // TODO: refactor
  // const getUpdatedRepo = (repo: Repository) => {
  //   const { prevRepo, updatedAt } = prevRepoState;
  //
  //   if (prevRepo && updatedAt && isToday(updatedAt)) {
  //     return prevRepo;
  //   }
  //
  //   return repo;
  // };

  const updateAtomRepoState = (repo: Repository) => {
    // TODO: refactor
    // const updatedRepo = getUpdatedRepo(repo);
    const updatedRepoState = generateUpdatedRepoState(repo);
    setPrevRepoState(updatedRepoState);
  };

  return {
    prevRepoState,
    updateAtomRepoState,
    generateUpdatedRepoState,
    resetAtomRepoState,
  };
};

export default useRepoRecoilState;
