import { atom } from 'recoil';
import localStorageEffect from '@shared/atoms/effects';
import { RefactorSuggestedRepoInfo } from './types';

export const refactorSuggestedRepoInfoAtom = atom<RefactorSuggestedRepoInfo>({
  key: 'refactorSuggestedRepo',
  default: {
    prevRefactorSuggestedRepo: null,
    updatedAt: null,
    hasTodayCommit: false,
  },
  effects: [
    localStorageEffect<RefactorSuggestedRepoInfo>('refactorSuggestedRepo'),
  ],
});
