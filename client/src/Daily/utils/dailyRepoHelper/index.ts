import { GetDestructuredRepo } from './types';

export const getDestructuredRepo: GetDestructuredRepo = (rawRepo) => {
  return rawRepo.data.viewer.repository;
};
