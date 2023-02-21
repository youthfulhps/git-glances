import { atom } from 'recoil';
import storageEffect from '@shared/atoms/effects';
import { RefactorSuggestedRepoInfo } from './types';

export const refactorSuggestedRepoInfoAtom = atom<RefactorSuggestedRepoInfo>({
  key: 'refactorSuggestedRepo',
  default: {
    prevRefactorSuggestedRepo: null,
    updatedAt: null,
    hasTodayCommit: false,
  },
  effects: [storageEffect<RefactorSuggestedRepoInfo>('refactorSuggestedRepo')],
});
