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
