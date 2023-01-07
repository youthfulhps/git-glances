import React from 'react';
import FeatureSection from '@layout/components/FeatureSection';
import { ContributionsCollection } from '@shared/apis/contribution';
import { getContributionLevelBackgroundClass } from '../../utils/contributionStyleHelper';
import ContributionDetail from './ContributionDetail';

type ContributionCardProps = {
  contributionsCollection: ContributionsCollection;
};

function ContributionCard({ contributionsCollection }: ContributionCardProps) {
  return (
    <FeatureSection
      gridArea="Contribution"
      summary={contributionsCollection.contributionCalendar.totalContributions}
      backgroundClass={getContributionLevelBackgroundClass(
        contributionsCollection.contributionCalendar.totalContributions
      )}
    >
      <ContributionDetail contributionsCollection={contributionsCollection} />
    </FeatureSection>
  );
}

export default ContributionCard;
