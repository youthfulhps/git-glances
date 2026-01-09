import { useSuspenseQuery } from '@tanstack/react-query';
import { getRepoList, Repository } from '@shared/apis/repo';
import { useState } from 'react';
import moment from 'moment';
import { isToday } from '@shared/utils/date';
import { AxiosError } from 'axios';
import {
  getDestructuredRepoList,
  getRefactorSuggestedRepoIndex,
} from '../utils/refactorSuggestedRepoHelper';
import { RefactorSuggestedRepoInfo } from '../atoms/types';

const useRefactorSuggestedRepoQuery = () => {
  const [prevRefactorSuggestedRepoInfo, setPrevRefactorSuggestedRepoInfo] = useState<RefactorSuggestedRepoInfo>({
    prevRefactorSuggestedRepo: null,
    updatedAt: null,
    hasTodayCommit: false,
  });

  const generateNewRefactorSuggestedRepoInfo = (newRefactorSuggestedRepo: Repository) => {
    return {
      prevRefactorSuggestedRepo: newRefactorSuggestedRepo,
      updatedAt: moment().format(),
      hasTodayCommit: isToday(newRefactorSuggestedRepo.pushedAt),
    };
  };

  const getNewRefactorSuggestedRepo = (repositories: Repository[]) => {
    const filteredRepositories = repositories.filter((repository) => !!repository.defaultBranchRef);
    const { prevRefactorSuggestedRepo, updatedAt } = prevRefactorSuggestedRepoInfo;

    const newRefactorSuggestedRepoIndex = getRefactorSuggestedRepoIndex(filteredRepositories);

    const newRefactorSuggestedRepo = filteredRepositories[newRefactorSuggestedRepoIndex];

    if (prevRefactorSuggestedRepo && updatedAt && isToday(updatedAt)) {
      const updatedRefactorSuggestedRepo = filteredRepositories.filter(
        (repo) => repo.name === prevRefactorSuggestedRepo.name
      );

      if (updatedRefactorSuggestedRepo.length) {
        return updatedRefactorSuggestedRepo[0];
      }

      return newRefactorSuggestedRepo;
    }

    return newRefactorSuggestedRepo;
  };

  const { data: refactorSuggestedRepoInfo } = useSuspenseQuery<
    RefactorSuggestedRepoInfo,
    AxiosError,
    RefactorSuggestedRepoInfo
  >({
    queryKey: ['refactorSuggestedRepoInfo'],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await getRepoList();
      const destructuredRepoList = getDestructuredRepoList(data);

      const newRefactorSuggestedRepo = getNewRefactorSuggestedRepo(destructuredRepoList);
      const newRefactorSuggestedRepoInfo =
        generateNewRefactorSuggestedRepoInfo(newRefactorSuggestedRepo);

      setPrevRefactorSuggestedRepoInfo(newRefactorSuggestedRepoInfo);

      return newRefactorSuggestedRepoInfo;
    },
  });

  return refactorSuggestedRepoInfo;
};

export default useRefactorSuggestedRepoQuery;
