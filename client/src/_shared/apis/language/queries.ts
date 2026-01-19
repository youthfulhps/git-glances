export const GET_USER_LANGUAGE_LIST_QUERY = `
query {
  viewer {
    repositories(first: 100, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
      nodes {
        name
        url
        primaryLanguage {
          name
          color
        }
        languages(first: 100) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
  }
}
`;
