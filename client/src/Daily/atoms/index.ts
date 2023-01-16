import { atom } from 'recoil';
import localStorageEffect from '@shared/atoms/effects';
import { AtomRepoState } from '@shared/atoms/types';

export const dailyRepoAtom = atom<AtomRepoState>({
  key: 'dailyRepo',
  default: {
    prevRepo: null,
    updatedAt: '',
    hasTodayContribution: false,
  },
  effects: [localStorageEffect<AtomRepoState>('dailyRepo')],
});
