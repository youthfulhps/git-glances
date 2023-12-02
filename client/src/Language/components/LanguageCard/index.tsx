import React from 'react';
import FeatureSection from '@layout/components/FeatureSection';
import { getLanguageBackgroundColor } from '../../utils/languageStyleHelper';
import LanguageDetail from './LanguageDetail';

type LanguageCardProps = {
  mostUsedLanguage: { name: string; lines: number };
};

function LanguageCard({ mostUsedLanguage }: LanguageCardProps) {
  return (
    <FeatureSection
      summary={mostUsedLanguage.name}
      gridArea="Language"
      backgroundColor={getLanguageBackgroundColor(mostUsedLanguage.name)}
      hasOverlay
    >
      <LanguageDetail
        mostUsedLanguageLines={mostUsedLanguage.lines}
        backgroundColor={getLanguageBackgroundColor(mostUsedLanguage.name)}
      />
    </FeatureSection>
  );
}

export default LanguageCard;
