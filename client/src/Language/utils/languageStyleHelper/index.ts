import { languageDetailList } from '../../constants/languageDetailList';

export const getLanguageBackgroundColor = (languageName: string) => {
  return languageDetailList[languageName].color || '#000000';
};
