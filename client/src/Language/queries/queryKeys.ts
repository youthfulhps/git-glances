export const languageQueryKeys = {
  all: ['language'] as const,
  list: () => [...languageQueryKeys.all, 'list'] as const,
};
