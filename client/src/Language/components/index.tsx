import React from 'react';
import useMostUsedLanguageQuery from '../queries/useMostUsedLanguageQuery';
import LanguageCard from './LanguageCard';

function Language() {
  const mostUsedLanguage = useMostUsedLanguageQuery();

  return (
    <Section gridArea="language">
      <MostUsedLanguage {...mostUsedLanguage} />
    </Section>
  );
}

export default Language;
