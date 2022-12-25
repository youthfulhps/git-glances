import { useQuery } from '@tanstack/react-query';
import { getUser, User } from '@shared/apis/user';

const useUserQuery = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await getUser();
      return data;
    },
  });

  return user as User;
};

export default useUserQuery;
