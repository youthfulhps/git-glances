import React from 'react';
import LanguageCard from './LanguageCard';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { SuspenseQuery } from '@suspensive/react-query';
import { mostUsedLanguageQueryOptions } from '../queries/useMostUsedLanguageQuery';

function Language() {
  return (
    <SuspenseBoundary gridArea="Language">
      <SuspenseQuery {...mostUsedLanguageQueryOptions}>
        {({ data: mostUsedLanguageList }) => (
          <LanguageCard mostUsedLanguageList={mostUsedLanguageList} />
        )}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default Language;
