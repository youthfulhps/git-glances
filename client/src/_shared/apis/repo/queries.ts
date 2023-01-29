export const GET_REPO_LIST_QUERY = `
query {
  viewer {
    repositories(first: 50, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
      nodes {
        url
        name
        description
        pushedAt
        updatedAt
        defaultBranchRef {
          name
          target {
            ... on Commit {
              history(first: 1) {
                totalCount
                nodes {
                  ... on Commit {
                    url
                    committedDate
                    message
                    additions
                    deletions
                    author {
                      name
                      email
                      avatarUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    }    
  }
}
`;

export const getRepoQuery = (repoName: string) => `
query {
  viewer {
    repository(name: "${repoName}") {
      url
      name
      description
      pushedAt
      updatedAt
      defaultBranchRef {
        name
        target {
          ... on Commit {
            history(first: 1) {
              totalCount
              nodes {
                ... on Commit {
                  url
                  committedDate
                  message
                  additions
                  deletions
                  author {
                    name
                    email
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const getTrendsRepoListQuery = (language: string, created: string) => `
query {
  search(query: "language:${language} created:${created}", type: REPOSITORY, first: 10) {
    edges {
      node {
        ... on Repository {
          url
          name
          description
          pushedAt
          updatedAt
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
        }
      }
    }
  }
}
`;
