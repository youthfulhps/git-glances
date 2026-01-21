import { TrendsRepository } from '@shared/apis/repo';

export const mockTrendsRepo: TrendsRepository = {
  url: 'https://github.com/trending/repo',
  name: 'awesome-project',
  description: 'An amazing open source project that everyone is talking about',
  pushedAt: '2024-01-20T10:00:00Z',
  updatedAt: '2024-01-20T10:00:00Z',
  createdAt: '2023-06-15T08:00:00Z',
  owner: {
    login: 'github',
    avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
  },
  primaryLanguage: {
    name: 'TypeScript',
    color: '#3178c6',
  },
  forks: {
    totalCount: 1234,
  },
  stargazers: {
    totalCount: 45678,
  },
};
