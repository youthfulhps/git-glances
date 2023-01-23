import { axiosInstance } from '@shared/apis';
import { GetRepo, GetRepoList, GetTrendsRepoList } from '@shared/apis/repo/types';
import { getDailyRange } from '@shared/utils/date';
import { GET_REPO_LIST_QUERY, getRepoQuery, getTrendsRepoListQuery } from './queries';

export const getRepoList: GetRepoList = () => {
  const body = {
    query: GET_REPO_LIST_QUERY,
  };

  return axiosInstance.post('/graphql', body);
};

export const getRepo: GetRepo = (repoName) => {
  const body = {
    query: getRepoQuery(repoName),
  };

  return axiosInstance.post('/graphql', body);
};

export const getTrendsRepoList: GetTrendsRepoList = () => {
  const body = {
    query: getTrendsRepoListQuery(getDailyRange()),
  };

  return axiosInstance.post('/graphql', body);
};
