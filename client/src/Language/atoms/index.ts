import { atom } from 'recoil';
import localStorageEffect from '@shared/atoms/effects';

export const mostUsedLanguageAtom = atom<string>({
  key: 'mostUsedLanguage',
  default: '',
  effects: [localStorageEffect<string>('mostUsedLanguage')],
});
