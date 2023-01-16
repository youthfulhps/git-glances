import { NestedFieldResponse } from '@shared/apis/types';
import { Repository } from '@shared/apis/repo';

export type GetDestructuredRepo = (
  rawRepo: NestedFieldResponse<Repository>
) => Repository;
