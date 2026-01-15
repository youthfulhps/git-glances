export const trendsRepoListQueryKeys = {
  all: ['trendsRepoList'] as const,
  list: (language: string) => [...trendsRepoListQueryKeys.all, language] as const,
};
