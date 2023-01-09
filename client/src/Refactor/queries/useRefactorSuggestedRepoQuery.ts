import { useQuery } from '@tanstack/react-query';
import { getRepoList, Repository } from '@shared/apis/repo';
import { useRecoilState } from 'recoil';
import moment from 'moment';
import { isToday } from '@shared/utils/date';
import {
  getDestructuredRepoList,
  getRefactorSuggestedRepoIndex,
} from '../utils/refactorSuggestedRepoHelper';
import { refactorSuggestedRepoInfoAtom } from '../atoms';
import { RefactorSuggestedRepoInfo } from '../atoms/types';

const useRefactorSuggestedRepoQuery = () => {
  const [prevRefactorSuggestedRepoInfo, setPrevRefactorSuggestedRepoInfo] =
    useRecoilState(refactorSuggestedRepoInfoAtom);

  const generateNewRefactorSuggestedRepoInfo = (
    newRefactorSuggestedRepo: Repository
  ) => {
    return {
      prevRefactorSuggestedRepo: newRefactorSuggestedRepo,
      updatedAt: moment().format(),
      hasTodayCommit: isToday(newRefactorSuggestedRepo.pushedAt),
    };
  };

  const getNewRefactorSuggestedRepo = (repositories: Repository[]) => {
    const { prevRefactorSuggestedRepo, updatedAt } =
      prevRefactorSuggestedRepoInfo;

    const newRefactorSuggestedRepoIndex =
      getRefactorSuggestedRepoIndex(repositories);

    const newRefactorSuggestedRepo =
      repositories[newRefactorSuggestedRepoIndex];

    if (prevRefactorSuggestedRepo && updatedAt && isToday(updatedAt)) {
      const updatedRefactorSuggestedRepo = repositories.filter(
        (repo) => repo.name === prevRefactorSuggestedRepo.name
      );

      if (updatedRefactorSuggestedRepo.length) {
        return updatedRefactorSuggestedRepo[0];
      }

      return newRefactorSuggestedRepo;
    }

    return newRefactorSuggestedRepo;
  };

  const { data: refactorSuggestedRepoInfo } = useQuery({
    queryKey: ['refactorSuggestedRepoInfo'],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getRepoList();
      const destructuredRepoList = getDestructuredRepoList(data);

      const newRefactorSuggestedRepo =
        getNewRefactorSuggestedRepo(destructuredRepoList);
      const newRefactorSuggestedRepoInfo = generateNewRefactorSuggestedRepoInfo(
        newRefactorSuggestedRepo
      );

      setPrevRefactorSuggestedRepoInfo(newRefactorSuggestedRepoInfo);

      return newRefactorSuggestedRepoInfo;
    },
  });

  return refactorSuggestedRepoInfo as RefactorSuggestedRepoInfo;
};

export default useRefactorSuggestedRepoQuery;
