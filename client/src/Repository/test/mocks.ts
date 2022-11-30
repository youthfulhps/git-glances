export const mockedRawRepoList = {
  data: {
    viewer: {
      repositories: {
        nodes: [
          {
            url: 'https://github.com/youthfulhps/gitin',
            name: 'gitin',
            description: null,
            pushedAt: '2022-11-29T04:23:26Z',
            updatedAt: '2022-11-29T04:10:30Z',
            defaultBranchRef: {
              name: 'main',
              target: {
                history: {
                  totalCount: 97,
                  nodes: [
                    {
                      url: 'https://github.com/youthfulhps/gitin/commit/9027aa0886b38f406f44653de8ff2f43de447777',
                      committedDate: '2022-11-23T07:47:41Z',
                      message:
                        'Merge pull request #14 from youthfulhps/develop\n\nv1.1.1',
                      additions: 6,
                      author: {
                        name: 'Byeongho Yoo',
                        email: 'ybh942002@gmail.com',
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            url: 'https://github.com/youthfulhps/conditionalGAN-tensorflow-python',
            name: 'conditionalGAN-tensorflow-python',
            description: 'Noise-Reduction study via cGANs',
            pushedAt: '2022-11-22T10:15:01Z',
            updatedAt: '2022-03-25T06:51:15Z',
            defaultBranchRef: {
              name: 'master',
              target: {
                history: {
                  totalCount: 10,
                  nodes: [
                    {
                      url: 'https://github.com/youthfulhps/conditionalGAN-tensorflow-python/commit/33eca85ef7d6c18703e9722e350d76c0e2e40ca3',
                      committedDate: '2022-09-29T01:53:30Z',
                      message:
                        'Merge pull request #14 from youthfulhps/dependabot/pip/numpy-1.22.0\n\n⬆️ Bump numpy from 1.14.3 to 1.22.0',
                      additions: 1,
                      author: {
                        name: 'Byeongho Yoo',
                        email: 'ybh942002@gmail.com',
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            url: 'https://github.com/youthfulhps/vercel-express',
            name: 'vercel-express',
            description: 'express를 통해 간단한 API를 구현하고 배포해봅니다. ',
            pushedAt: '2022-10-30T14:24:59Z',
            updatedAt: '2022-10-30T14:31:30Z',
            defaultBranchRef: {
              name: 'main',
              target: {
                history: {
                  totalCount: 2,
                  nodes: [
                    {
                      url: 'https://github.com/youthfulhps/vercel-express/commit/ca6ba56f5dc38edc4708cc8b5b760c01cc61620d',
                      committedDate: '2022-10-30T14:24:55Z',
                      message: 'WIP: temp commit for vercel deploy',
                      additions: 617,
                      author: {
                        name: 'youthfulhps',
                        email: 'ybh942002@gmail.com',
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            url: 'https://github.com/youthfulhps/youthfulhps.github.io',
            name: 'youthfulhps.github.io',
            description: 'Personal tech blog via gatsby',
            pushedAt: '2022-10-28T07:15:33Z',
            updatedAt: '2022-06-19T09:33:15Z',
            defaultBranchRef: {
              name: 'main',
              target: {
                history: {
                  totalCount: 168,
                  nodes: [
                    {
                      url: 'https://github.com/youthfulhps/youthfulhps.github.io/commit/cf0bd59d756a8e6906fdf09fd7eea36b5def66dd',
                      committedDate: '2022-10-28T07:13:06Z',
                      message: 'Style: Update category container styles',
                      additions: 7,
                      author: {
                        name: 'youthfulhps',
                        email: 'ybh942002@gmail.com',
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            url: 'https://github.com/youthfulhps/TIL',
            name: 'TIL',
            description: 'Today I Learned ',
            pushedAt: '2022-10-10T13:35:15Z',
            updatedAt: '2022-09-29T01:50:54Z',
            defaultBranchRef: {
              name: 'main',
              target: {
                history: {
                  totalCount: 103,
                  nodes: [
                    {
                      url: 'https://github.com/youthfulhps/TIL/commit/7744ed90e7057398414d119a429cdf1d472b9f99',
                      committedDate: '2022-10-10T13:35:11Z',
                      message: 'Post development storybook',
                      additions: 334,
                      author: {
                        name: 'youthfulhps',
                        email: 'ybh942002@gmail.com',
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  },
};

export const mockedDestructuredRepoList = [
  {
    url: 'https://github.com/youthfulhps/gitin',
    name: 'gitin',
    description: null,
    pushedAt: '2022-11-29T04:23:26Z',
    updatedAt: '2022-11-29T04:10:30Z',
    defaultBranchRef: {
      name: 'main',
      target: {
        history: {
          totalCount: 97,
          nodes: [
            {
              url: 'https://github.com/youthfulhps/gitin/commit/9027aa0886b38f406f44653de8ff2f43de447777',
              committedDate: '2022-11-23T07:47:41Z',
              message:
                'Merge pull request #14 from youthfulhps/develop\n\nv1.1.1',
              additions: 6,
              author: {
                name: 'Byeongho Yoo',
                email: 'ybh942002@gmail.com',
              },
            },
          ],
        },
      },
    },
  },
  {
    url: 'https://github.com/youthfulhps/conditionalGAN-tensorflow-python',
    name: 'conditionalGAN-tensorflow-python',
    description: 'Noise-Reduction study via cGANs',
    pushedAt: '2022-11-22T10:15:01Z',
    updatedAt: '2022-03-25T06:51:15Z',
    defaultBranchRef: {
      name: 'master',
      target: {
        history: {
          totalCount: 10,
          nodes: [
            {
              url: 'https://github.com/youthfulhps/conditionalGAN-tensorflow-python/commit/33eca85ef7d6c18703e9722e350d76c0e2e40ca3',
              committedDate: '2022-09-29T01:53:30Z',
              message:
                'Merge pull request #14 from youthfulhps/dependabot/pip/numpy-1.22.0\n\n⬆️ Bump numpy from 1.14.3 to 1.22.0',
              additions: 1,
              author: {
                name: 'Byeongho Yoo',
                email: 'ybh942002@gmail.com',
              },
            },
          ],
        },
      },
    },
  },
  {
    url: 'https://github.com/youthfulhps/vercel-express',
    name: 'vercel-express',
    description: 'express를 통해 간단한 API를 구현하고 배포해봅니다. ',
    pushedAt: '2022-10-30T14:24:59Z',
    updatedAt: '2022-10-30T14:31:30Z',
    defaultBranchRef: {
      name: 'main',
      target: {
        history: {
          totalCount: 2,
          nodes: [
            {
              url: 'https://github.com/youthfulhps/vercel-express/commit/ca6ba56f5dc38edc4708cc8b5b760c01cc61620d',
              committedDate: '2022-10-30T14:24:55Z',
              message: 'WIP: temp commit for vercel deploy',
              additions: 617,
              author: {
                name: 'youthfulhps',
                email: 'ybh942002@gmail.com',
              },
            },
          ],
        },
      },
    },
  },
  {
    url: 'https://github.com/youthfulhps/youthfulhps.github.io',
    name: 'youthfulhps.github.io',
    description: 'Personal tech blog via gatsby',
    pushedAt: '2022-10-28T07:15:33Z',
    updatedAt: '2022-06-19T09:33:15Z',
    defaultBranchRef: {
      name: 'main',
      target: {
        history: {
          totalCount: 168,
          nodes: [
            {
              url: 'https://github.com/youthfulhps/youthfulhps.github.io/commit/cf0bd59d756a8e6906fdf09fd7eea36b5def66dd',
              committedDate: '2022-10-28T07:13:06Z',
              message: 'Style: Update category container styles',
              additions: 7,
              author: {
                name: 'youthfulhps',
                email: 'ybh942002@gmail.com',
              },
            },
          ],
        },
      },
    },
  },
  {
    url: 'https://github.com/youthfulhps/TIL',
    name: 'TIL',
    description: 'Today I Learned ',
    pushedAt: '2022-10-10T13:35:15Z',
    updatedAt: '2022-09-29T01:50:54Z',
    defaultBranchRef: {
      name: 'main',
      target: {
        history: {
          totalCount: 103,
          nodes: [
            {
              url: 'https://github.com/youthfulhps/TIL/commit/7744ed90e7057398414d119a429cdf1d472b9f99',
              committedDate: '2022-10-10T13:35:11Z',
              message: 'Post development storybook',
              additions: 334,
              author: {
                name: 'youthfulhps',
                email: 'ybh942002@gmail.com',
              },
            },
          ],
        },
      },
    },
  },
];
