import { getUser } from '@shared/apis/user';
import { queryOptions } from '@tanstack/react-query';
import { userQueryKey } from './queryKeys';

export const userQueryOptions = queryOptions({
  queryKey: userQueryKey.detail(),
  queryFn: getUser,
});
