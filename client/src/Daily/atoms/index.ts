import { atom } from 'recoil';
import storageEffect from '@shared/atoms/effects';
import { AtomRepoState } from '@shared/atoms/types';

export const dailyRepoAtom = atom<AtomRepoState>({
  key: 'dailyRepo',
  default: {
    prevRepo: null,
    updatedAt: '',
    hasTodayContribution: false,
  },
  effects: [storageEffect<AtomRepoState>('dailyRepo')],
});
