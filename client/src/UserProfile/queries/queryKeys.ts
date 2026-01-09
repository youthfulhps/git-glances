export const userQueryKey = {
  all: ['user'] as const,
  detail: () => [...userQueryKey.all, 'detail'] as const,
};
