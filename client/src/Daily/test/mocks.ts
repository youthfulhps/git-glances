export const mockedNestedRepository = {
  data: {
    viewer: {
      repository: {
        url: 'https://github.com/youthfulhps/gitin',
        name: 'gitin',
        description: '',
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
                  message: 'Update README',
                  additions: 6,
                  deletions: 6,
                  author: {
                    name: 'Byeongho Yoo',
                    email: 'ybh942002@gmail.com',
                    avatarUrl: '',
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
};

export const mockedDestructuredRepository = {
  url: 'https://github.com/youthfulhps/gitin',
  name: 'gitin',
  description: '',
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
            message: 'Update README',
            additions: 6,
            deletions: 6,
            author: {
              name: 'Byeongho Yoo',
              email: 'ybh942002@gmail.com',
              avatarUrl: '',
            },
          },
        ],
      },
    },
  },
};
