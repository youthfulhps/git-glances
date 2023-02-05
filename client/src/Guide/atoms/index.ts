import { atom } from 'recoil';

export const isGuideShowingAtom = atom<boolean>({
  key: 'isGuideShowing',
  default: false,
});
