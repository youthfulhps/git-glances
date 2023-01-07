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

  const setNewRefactorSuggestedRepo = (repoList: Repository[]) => {
    const newRefactorSuggestedRepoIndex =
      getRefactorSuggestedRepoIndex(repoList);

    setPrevRefactorSuggestedRepoInfo({
      prevRefactorSuggestedRepo: repoList[newRefactorSuggestedRepoIndex],
      updatedAt: moment().format(),
      hasTodayCommit: isToday(repoList[newRefactorSuggestedRepoIndex].pushedAt),
    });
  };

  const { data: refactorSuggestedRepoInfo } = useQuery({
    queryKey: ['refactorSuggestedRepoInfo'],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getRepoList();

      const destructuredRepoList = getDestructuredRepoList(data);

      const { prevRefactorSuggestedRepo, updatedAt } =
        prevRefactorSuggestedRepoInfo;

      if (!prevRefactorSuggestedRepo || (updatedAt && !isToday(updatedAt))) {
        setNewRefactorSuggestedRepo(destructuredRepoList);
        return prevRefactorSuggestedRepoInfo;
      }

      const updatedRefactorSuggestedRepo = destructuredRepoList.filter(
        (repo) => repo.name === prevRefactorSuggestedRepo.name
      );

      if (updatedRefactorSuggestedRepo.length) {
        setPrevRefactorSuggestedRepoInfo({
          prevRefactorSuggestedRepo: updatedRefactorSuggestedRepo[0],
          updatedAt: moment().format(),
          hasTodayCommit: isToday(
            updatedRefactorSuggestedRepo[0].pushedAt || ''
          ),
        });
      } else {
        setNewRefactorSuggestedRepo(destructuredRepoList);
      }

      return prevRefactorSuggestedRepoInfo;
    },
  });

  return refactorSuggestedRepoInfo as RefactorSuggestedRepoInfo;
};

export default useRefactorSuggestedRepoQuery;
