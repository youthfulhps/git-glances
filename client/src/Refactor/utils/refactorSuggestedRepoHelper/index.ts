import { GetDestructuredRepoList, GetRefactorSuggestedRepoIndex } from './types';

export const getDestructuredRepoList: GetDestructuredRepoList = (rawRepoList) => {
  return rawRepoList.data.viewer.repositories.nodes;
};

export const getRefactorSuggestedRepoIndex: GetRefactorSuggestedRepoIndex = (repoList) => {
  return Math.floor(Math.random() * repoList.length);
};
