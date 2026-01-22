export const pullRequestQueryKeys = {
  all: ['pullRequest'] as const,
  reviewRequested: () => [...pullRequestQueryKeys.all, 'reviewRequested'] as const,
};
