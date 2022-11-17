export const mockedRawLanguageList = {
  data: {
    viewer: {
      repositories: {
        nodes: [
          {
            languages: {
              edges: [
                { size: 10, node: { name: 'Vue' } },
                { size: 10, node: { name: 'JavaScript' } },
                { size: 10, node: { name: 'HTML' } },
                { size: 10, node: { name: 'TypeScript' } },
              ],
            },
          },
          { languages: { edges: [] } },
          {
            languages: {
              edges: [
                { size: 10, node: { name: 'JavaScript' } },
                { size: 10, node: { name: 'SCSS' } },
              ],
            },
          },
          {
            languages: {
              edges: [
                { size: 10, node: { name: 'Shell' } },
                { size: 10, node: { name: 'JavaScript' } },
                { size: 10, node: { name: 'TypeScript' } },
                { size: 10, node: { name: 'CSS' } },
              ],
            },
          },
          {
            languages: {
              edges: [
                { size: 10, node: { name: 'TypeScript' } },
                { size: 10, node: { name: 'HTML' } },
                { size: 10, node: { name: 'JavaScript' } },
                { size: 10, node: { name: 'CSS' } },
              ],
            },
          },
        ],
      },
    },
  },
};

export const mockedDestructuredLanguageList = [
  {
    languages: {
      edges: [
        { size: 10, node: { name: 'Vue' } },
        { size: 10, node: { name: 'JavaScript' } },
        { size: 10, node: { name: 'HTML' } },
        { size: 10, node: { name: 'TypeScript' } },
      ],
    },
  },
  { languages: { edges: [] } },
  {
    languages: {
      edges: [
        { size: 10, node: { name: 'JavaScript' } },
        { size: 10, node: { name: 'SCSS' } },
      ],
    },
  },
  {
    languages: {
      edges: [
        { size: 10, node: { name: 'Shell' } },
        { size: 10, node: { name: 'JavaScript' } },
        { size: 10, node: { name: 'TypeScript' } },
        { size: 10, node: { name: 'CSS' } },
      ],
    },
  },
  {
    languages: {
      edges: [
        { size: 10, node: { name: 'TypeScript' } },
        { size: 10, node: { name: 'HTML' } },
        { size: 10, node: { name: 'JavaScript' } },
        { size: 10, node: { name: 'CSS' } },
      ],
    },
  },
];

export const mockedMergedLanguageList = {
  CSS: 20,
  SCSS: 10,
  Shell: 10,
  Vue: 10,
  JavaScript: 40,
  HTML: 20,
  TypeScript: 30,
};
