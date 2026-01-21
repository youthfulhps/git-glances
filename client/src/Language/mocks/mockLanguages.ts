import { LanguageWithRepos } from '@shared/apis/language/types';

export const mockLanguages: LanguageWithRepos[] = [
  {
    name: 'TypeScript',
    color: '#3178c6',
    totalSize: 1245600,
    percentage: 42.5,
    repoCount: 3,
    repositories: [
      { name: 'awesome-app', url: '', size: 524288, percentage: 42.1 },
      { name: 'cool-project', url: '', size: 458752, percentage: 36.8 },
      { name: 'web-platform', url: '', size: 262560, percentage: 21.1 },
    ],
  },
  {
    name: 'JavaScript',
    color: '#f1e05a',
    totalSize: 892400,
    percentage: 30.4,
    repoCount: 2,
    repositories: [
      { name: 'frontend-lib', url: '', size: 535440, percentage: 60.0 },
      { name: 'utils-package', url: '', size: 356960, percentage: 40.0 },
    ],
  },
  {
    name: 'Python',
    color: '#3572A5',
    totalSize: 523800,
    percentage: 17.8,
    repoCount: 2,
    repositories: [
      { name: 'ml-toolkit', url: '', size: 314280, percentage: 60.0 },
      { name: 'data-processor', url: '', size: 209520, percentage: 40.0 },
    ],
  },
  {
    name: 'CSS',
    color: '#563d7c',
    totalSize: 187200,
    percentage: 6.4,
    repoCount: 1,
    repositories: [{ name: 'design-system', url: '', size: 187200, percentage: 100.0 }],
  },
  {
    name: 'HTML',
    color: '#e34c26',
    totalSize: 85200,
    percentage: 2.9,
    repoCount: 1,
    repositories: [{ name: 'landing-pages', url: '', size: 85200, percentage: 100.0 }],
  },
];
