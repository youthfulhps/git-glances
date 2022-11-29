import { axiosInstance } from '@shared/apis';
import { GET_REPO_LIST_QUERY } from './queries';

export const getRepoList = () => {
  const body = {
    query: GET_REPO_LIST_QUERY,
  };

  return axiosInstance.post('/graphql', body);
};
