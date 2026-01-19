import { mutationOptions } from '@tanstack/react-query';
import { generateLanguageInsight } from '@shared/apis/ai';

export const languageInsightMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: {
      languages: Array<{
        name: string;
        percentage: number;
        repoCount: number;
        totalSize: number;
      }>;
      totalRepos: number;
      topLanguage: string;
    }) => {
      const { data } = await generateLanguageInsight(params);
      return data;
    },
  });
