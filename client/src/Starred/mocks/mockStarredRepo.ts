import { TrendsRepository } from '@shared/apis/repo';

export const mockStarredRepo: TrendsRepository = {
  url: 'https://github.com/favorite/repo',
  name: 'favorite-framework',
  description: 'Your favorite JavaScript framework for building modern web applications',
  pushedAt: '2024-01-19T14:30:00Z',
  updatedAt: '2024-01-19T14:30:00Z',
  createdAt: '2022-03-10T09:00:00Z',
  owner: {
    login: 'framework-team',
    avatarUrl: 'https://avatars.githubusercontent.com/u/6078720?v=4',
  },
  primaryLanguage: {
    name: 'JavaScript',
    color: '#f1e05a',
  },
  forks: {
    totalCount: 2345,
  },
  stargazers: {
    totalCount: 89012,
  },
};
