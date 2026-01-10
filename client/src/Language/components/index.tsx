import React from 'react';
import useMostUsedLanguageQuery from '../queries/useMostUsedLanguageQuery';
import LanguageCard from './LanguageCard';

function Language() {
  const mostUsedLanguageList = useMostUsedLanguageQuery();

  return <LanguageCard mostUsedLanguageList={mostUsedLanguageList} />;
}

export default Language;
