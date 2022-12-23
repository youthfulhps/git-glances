import React from 'react';
import EnhancedSection from '@layout/components/EnhancedSection';
import { ContributionsCollection } from '@shared/apis/contribution';
import { getContributionLevelBackgroundClass } from '../../utils/contributionStyleHelper';
import ContributionDetail from './ContributionDetail';

type ContributionCardProps = {
  contributionsCollection: ContributionsCollection;
};

function ContributionCard({ contributionsCollection }: ContributionCardProps) {
  return (
    <EnhancedSection
      gridArea="Contribution"
      summary={contributionsCollection.contributionCalendar.totalContributions}
      backgroundClass={getContributionLevelBackgroundClass(
        contributionsCollection.contributionCalendar.totalContributions
      )}
    >
      <ContributionDetail contributionsCollection={contributionsCollection} />
    </EnhancedSection>
  );
}

export default ContributionCard;
