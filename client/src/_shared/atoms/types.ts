import { Repository } from '@shared/apis/repo';

export type AtomRepoState = {
  prevRepo: Repository | null;
  updatedAt: string;
  hasTodayContribution: boolean;
};
