import React from 'react';
import LanguageSummary from './LanguageSummary';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { SuspenseQuery } from '@suspensive/react-query';
import { languageListQueryOptions } from '../queries/useLanguageListQuery';
import { mockLanguages } from '../mocks/mockLanguages';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';

function Language() {
  const { openLanguageBoard } = useBoard();
  return (
    <SuspenseBoundary
      gridArea="Language"
      mockContent={<LanguageSummary languages={mockLanguages} />}
    >
      <SuspenseQuery {...languageListQueryOptions}>
        {({ data: languages }) => (
          <SectionV2 gridArea="Language" onClick={openLanguageBoard}>
            <LanguageSummary languages={languages} />
          </SectionV2>
        )}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default Language;
