import { languageDetailList } from '../../constants/languageDetailList';
import { GetLanguageBackgroundColor } from './types';

export const getLanguageBackgroundColor: GetLanguageBackgroundColor = (languageName) => {
  return languageDetailList[languageName]?.color ?? '#000000';
};
