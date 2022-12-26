import { axiosInstance } from '@shared/apis';
import { GET_USER_LANGUAGE_LIST_QUERY } from '@shared/apis/language/queries';
import { GetLanguageList } from '@shared/apis/language/types';

export const getLanguageList: GetLanguageList = () => {
  const body = {
    query: GET_USER_LANGUAGE_LIST_QUERY,
  };

  return axiosInstance.post('/graphql', body);
};
