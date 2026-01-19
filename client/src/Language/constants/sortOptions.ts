export type SortOption = 'usage' | 'repos' | 'name';

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Usage', value: 'usage' },
  { label: 'Repositories', value: 'repos' },
  { label: 'Name', value: 'name' },
];
