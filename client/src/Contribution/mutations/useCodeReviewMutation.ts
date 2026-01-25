import { mutationOptions } from '@tanstack/react-query';
import { generateCodeReview } from '@shared/apis/ai';

export const codeReviewMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: { diff: string; commitMessage?: string; prTitle?: string }) => {
      const { data } = await generateCodeReview(params);
      return data;
    },
  });
