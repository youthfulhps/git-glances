import { useQuery } from '@tanstack/react-query';
import { getRepoList } from '@shared/apis/repo';
import cookie from 'cookiejs';
import {
  getDestructuredRepoList,
  getRepoSuggestedMaintenanceIndex,
} from '../utils/repoHelper';

const useRepoSuggestedMaintenanceQuery = () => {
  const { data: repoSuggestedMaintenance } = useQuery({
    queryKey: ['repoSuggestedMaintenance'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const { data } = await getRepoList();

      const destructuredRepoList = getDestructuredRepoList(data);

      let repoSuggestedMaintenanceIndex = cookie.get(
        'gitin:repoSuggestedMaintenance'
      );

      if (!repoSuggestedMaintenanceIndex) {
        const newRepoIndex =
          getRepoSuggestedMaintenanceIndex(destructuredRepoList).toString();
        cookie.set('gitin:repoSuggestedMaintenance', newRepoIndex, {
          expires: 1,
        });
        repoSuggestedMaintenanceIndex = newRepoIndex;
      }

      return destructuredRepoList[Number(repoSuggestedMaintenanceIndex)];
    },
  });

  return { repoSuggestedMaintenance };
};

export default useRepoSuggestedMaintenanceQuery;
