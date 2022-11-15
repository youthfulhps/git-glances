import { axiosInstance } from '@shared/apis';
import { GET_USER_LANGUAGE_LIST_QUERY } from '@shared/apis/language/queries';

export const getLanguageList = () => {
  const body = {
    query: GET_USER_LANGUAGE_LIST_QUERY,
  };

  return axiosInstance.post('/graphql', body);
};
