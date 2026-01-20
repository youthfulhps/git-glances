import { queryOptions } from '@tanstack/react-query';
import { getUserEvents } from '@shared/apis/user/apis';

export const userEventsQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ['userEvents', username],
    queryFn: async () => {
      const { data } = await getUserEvents(username);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
