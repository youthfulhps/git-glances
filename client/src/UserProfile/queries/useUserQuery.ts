import { useSuspenseQuery } from '@tanstack/react-query';
import { getUser, User } from '@shared/apis/user';
import { AxiosError } from 'axios';

const useUserQuery = () => {
  const { data: user } = useSuspenseQuery<User, AxiosError>({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await getUser();
      return data;
    },
  });

  return user;
};

export default useUserQuery;
