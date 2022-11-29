import {
  GetDestructuredRepoList,
  GetRepoSuggestedMaintenanceIndex,
} from './types';

export const getDestructuredRepoList: GetDestructuredRepoList = (
  rawRepoList
) => {
  return rawRepoList?.data?.viewer?.repositories?.nodes ?? {};
};

export const getRepoSuggestedMaintenanceIndex: GetRepoSuggestedMaintenanceIndex =
  (repoList) => {
    return Math.floor(Math.random() * repoList.length);
  };
