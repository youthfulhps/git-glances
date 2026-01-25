export const notificationQueryKeys = {
  all: ['notification'] as const,
  list: () => [...notificationQueryKeys.all, 'list'] as const,
};
