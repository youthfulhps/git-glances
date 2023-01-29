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

export const getTrendsRepoList: GetTrendsRepoList = (language: string) => {
  const body = {
    query: getTrendsRepoListQuery(language, getDailyRange()),
  };

  return axiosInstance.post('/graphql', body);
};
