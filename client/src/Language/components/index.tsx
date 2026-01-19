import React from 'react';
import LanguageSummary from './LanguageSummary';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { SuspenseQuery } from '@suspensive/react-query';
import { languageListQueryOptions } from '../queries/useLanguageListQuery';

function Language() {
  return (
    <SuspenseBoundary gridArea="Language">
      <SuspenseQuery {...languageListQueryOptions}>
        {({ data: languages }) => <LanguageSummary languages={languages} />}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default Language;
