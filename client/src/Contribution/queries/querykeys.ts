export const contributionsQueryKeys = {
  all: ['contributionsQueryKeys'] as const,
  list: (from: string, to: string) => [...contributionsQueryKeys.all, from, to] as const,
};
