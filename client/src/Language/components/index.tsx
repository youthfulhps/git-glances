import React from 'react';
import useMostUsedLanguageQuery from '../queries/useMostUsedLanguageQuery';
import LanguageCard from './LanguageCard';

function Language() {
  const mostUsedLanguage = useMostUsedLanguageQuery();

  return <LanguageCard mostUsedLanguage={mostUsedLanguage} />;
}

export default Language;
