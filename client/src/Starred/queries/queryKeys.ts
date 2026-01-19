export const starredRepoListQueryKeys = {
  all: ['starredRepoList'] as const,
  list: () => [...starredRepoListQueryKeys.all] as const,
};
