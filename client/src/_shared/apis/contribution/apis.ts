import { getContributionQuery } from '@shared/apis/contribution/queries';
import { axiosInstance } from '@shared/apis';

export const getContribution = (from: string, to: string) => {
  const body = {
    query: getContributionQuery(from, to),
  };

  return axiosInstance.post('/graphql', body);
};
