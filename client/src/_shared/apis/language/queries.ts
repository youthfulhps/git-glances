export const GET_USER_LANGUAGE_LIST_QUERY = `
query {
  viewer {
    repositories(first: 100) {
      nodes {
        languages(first: 100) {
          edges {
            size
            node {
              name
            }
          }
        }
      }
    }
  }
}
`;
