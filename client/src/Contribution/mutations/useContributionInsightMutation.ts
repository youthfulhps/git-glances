import { mutationOptions } from '@tanstack/react-query';
import { generateContributionInsight } from '@shared/apis/ai';

export const contributionInsightMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: {
      totalCommits: number;
      totalPRs: number;
      totalReviews: number;
      totalIssues: number;
      period: string;
    }) => {
      const { data } = await generateContributionInsight(params);
      return data;
    },
  });
