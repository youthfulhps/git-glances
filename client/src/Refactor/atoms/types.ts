import { Repository } from '@shared/apis/repo';

export type RefactorSuggestedRepoInfo = {
  prevRefactorSuggestedRepo: Repository | null;
  updatedAt: string | null;
  hasTodayCommit: boolean;
};
