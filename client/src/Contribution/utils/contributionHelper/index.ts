import { GetDestructuredContributionsCollection } from './types';

export const getDestructuredContributionsCollection: GetDestructuredContributionsCollection = (
  nestedContributionsCollection
) => {
  return nestedContributionsCollection.data.viewer.contributionsCollection;
};
