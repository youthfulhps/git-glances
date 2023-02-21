import { atom } from 'recoil';
import storageEffect from '@shared/atoms/effects';

export const tokenAtom = atom<string>({
  key: 'gitGlances:token',
  default: '',
  effects: [storageEffect<string>('gitGlances:token')],
});
