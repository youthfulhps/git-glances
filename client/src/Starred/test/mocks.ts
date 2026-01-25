import { AsyncNestedAxiosResponse } from '@shared/apis/types';
import { TrendsRepository } from '@shared/apis/repo';

export const mockedRawStarredRepoList: AsyncNestedAxiosResponse<{
  viewer: {
    starredRepositories: {
      edges: Array<{
        node: TrendsRepository;
      }>;
    };
  };
}> = {
  data: {
    viewer: {
      starredRepositories: {
        edges: [
          {
            node: {
              url: 'https://github.com/favorite/repo',
              name: 'favorite-framework',
              description: 'Your favorite JavaScript framework',
              pushedAt: '2024-01-19T14:30:00Z',
              updatedAt: '2024-01-19T14:30:00Z',
              stargazers: { totalCount: 89012 },
              forks: { totalCount: 2345 },
            },
          },
          {
            node: {
              url: 'https://github.com/awesome/library',
              name: 'awesome-library',
              description: 'An awesome utility library',
              pushedAt: '2024-01-18T10:00:00Z',
              updatedAt: '2024-01-18T10:00:00Z',
              stargazers: { totalCount: 5000 },
              forks: { totalCount: 500 },
            },
          },
        ],
      },
    },
  },
};

export const mockedDestructuredStarredRepoList: TrendsRepository[] = [
  {
    url: 'https://github.com/favorite/repo',
    name: 'favorite-framework',
    description: 'Your favorite JavaScript framework',
    pushedAt: '2024-01-19T14:30:00Z',
    updatedAt: '2024-01-19T14:30:00Z',
    stargazers: { totalCount: 89012 },
    forks: { totalCount: 2345 },
  },
  {
    url: 'https://github.com/awesome/library',
    name: 'awesome-library',
    description: 'An awesome utility library',
    pushedAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
    stargazers: { totalCount: 5000 },
    forks: { totalCount: 500 },
  },
];
