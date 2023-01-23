import { GetDestructuredTrendsRepoList } from './types';

export const getDestructuredTrendsRepoList: GetDestructuredTrendsRepoList = (rawTrendsRepoList) => {
  return rawTrendsRepoList.data.search.edges.map((edge) => edge.node);
};
