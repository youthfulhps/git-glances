import { mutationOptions } from '@tanstack/react-query';
import { generateDeveloperPersona } from '@shared/apis/ai';

export const developerPersonaMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: {
      events: Array<{
        type: string;
        created_at: string;
      }>;
      username: string;
    }) => {
      const { data } = await generateDeveloperPersona(params);
      return data;
    },
  });
