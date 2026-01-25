import { mutationOptions } from '@tanstack/react-query';
import { summarizeRepository } from '@shared/apis/ai';

export const summarizeTrendsRepositoryMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: { repositoryName: string; description: string | null }) => {
      const { data } = await summarizeRepository(params.repositoryName, params.description);
      return data;
    },
  });
