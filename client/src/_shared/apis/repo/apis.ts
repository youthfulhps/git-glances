import { axiosInstance } from '@shared/apis';
import { GetRepoList } from '@shared/apis/repo/types';
import { GET_REPO_LIST_QUERY } from './queries';

export const getRepoList: GetRepoList = () => {
  const body = {
    query: GET_REPO_LIST_QUERY,
  };

  return axiosInstance.post('/graphql', body);
};
