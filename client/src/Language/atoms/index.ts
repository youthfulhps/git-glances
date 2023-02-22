import { atom } from 'recoil';
import storageEffect from '@shared/atoms/effects';

export const mostUsedLanguageAtom = atom<string>({
  key: 'mostUsedLanguage',
  default: '',
  effects: [storageEffect<string>('mostUsedLanguage')],
});
