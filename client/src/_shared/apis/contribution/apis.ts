import { getContributionsCollectionQuery } from '@shared/apis/contribution/queries';
import { axiosInstance } from '@shared/apis';
import { GetContributionsCollection } from '@shared/apis/contribution/types';

export const getContributionsCollection: GetContributionsCollection = (
  from: string,
  to: string
) => {
  const body = {
    query: getContributionsCollectionQuery(from, to),
  };

  return axiosInstance.post('/graphql', body);
};
