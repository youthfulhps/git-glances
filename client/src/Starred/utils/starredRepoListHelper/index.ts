import { GetDestructuredStarredRepoList } from './types';

export const getDestructuredStarredRepoList: GetDestructuredStarredRepoList = (rawStarredRepoList) => {
  return rawStarredRepoList.data.viewer.starredRepositories.edges.map((edge) => edge.node);
};
