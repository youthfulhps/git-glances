import React from 'react';
import FeatureSection from '@layout/components/FeatureSection';
import { getLanguageBackgroundColor } from '../../utils/languageStyleHelper';
import LanguageDetail from './LanguageDetail';
import { MostUsedLanguage } from '../../queries/useMostUsedLanguageQuery';

type LanguageCardProps = {
  mostUsedLanguage: MostUsedLanguage;
};

function LanguageCard({ mostUsedLanguage }: LanguageCardProps) {
  return (
    <FeatureSection summary={mostUsedLanguage.name} gridArea="Language">
      <LanguageDetail
        mostUsedLanguageLines={mostUsedLanguage.lines}
        backgroundColor={getLanguageBackgroundColor(mostUsedLanguage.name)}
      />
    </FeatureSection>
  );
}

export default LanguageCard;
