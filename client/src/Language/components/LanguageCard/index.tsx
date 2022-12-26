import React from 'react';
import EnhancedSection from '@layout/components/EnhancedSection';
import { getLanguageBackgroundColor } from '../../utils/languageStyleHelper';
import LanguageDetail from './LanguageDetail';

type LanguageCardProps = {
  mostUsedLanguage: { name: string; lines: number };
};

function LanguageCard({ mostUsedLanguage }: LanguageCardProps) {
  return (
    <EnhancedSection
      summary={mostUsedLanguage.name}
      gridArea="Language"
      backgroundColor={getLanguageBackgroundColor(mostUsedLanguage.name)}
      hasOverlay
    >
      <LanguageDetail mostUsedLanguageLines={mostUsedLanguage.lines} />
    </EnhancedSection>
  );
}

export default LanguageCard;
