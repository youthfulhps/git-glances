import { NestedFieldResponse } from '@shared/apis/types';
import { ContributionsCollection } from '@shared/apis/contribution';

export type GetDestructuredContributionsCollection = (
  nestedContributionsCollection: NestedFieldResponse<ContributionsCollection>
) => ContributionsCollection;
