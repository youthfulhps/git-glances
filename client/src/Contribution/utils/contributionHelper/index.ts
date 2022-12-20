import { GetDestructuredContribution } from './types';

export const getDestructuredContribution: GetDestructuredContribution = (
  contribution
) => {
  return contribution?.data?.viewer?.contributionsCollection ?? {};
};
