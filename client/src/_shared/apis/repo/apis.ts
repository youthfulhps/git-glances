import { axiosInstance } from '@shared/apis';
import { GetRepo, GetRepoList } from '@shared/apis/repo/types';
import { GET_REPO_LIST_QUERY, getRepoQuery } from './queries';

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
