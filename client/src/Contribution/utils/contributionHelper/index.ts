import { GetDestructuredContributionsCollection } from './types';

export const getDestructuredContributionsCollection: GetDestructuredContributionsCollection = (
  nestedContributionsCollection
) => {
  if (!nestedContributionsCollection?.data?.viewer?.contributionsCollection) {
    console.error('Invalid contributions collection response:', nestedContributionsCollection);
    throw new Error('Failed to parse contributions collection data');
  }
  return nestedContributionsCollection.data.viewer.contributionsCollection;
};
