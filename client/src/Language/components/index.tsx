import React from 'react';
import Section from '@layout/components/Section';
import useLanguageListQuery from '../queries/useLanguageListQuery';
import MostUsedLanguage from './MostUsedLanguage';

function Language() {
  const { mostUsedLanguage } = useLanguageListQuery();

  return (
    <Section gridArea="language">
      <MostUsedLanguage {...mostUsedLanguage} />
    </Section>
  );
}

export default Language;
