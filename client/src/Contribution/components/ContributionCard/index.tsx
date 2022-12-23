import React from 'react';
import EnhancedSection from '@layout/components/EnhancedSection';
import { getContributionLevelBackgroundClass } from '../../utils/contributionStyleHelper';
import ContributionDetail from './ContributionDetail';

type ContributionCardProps = {
  contribution: any;
};

function ContributionCard({ contribution }: ContributionCardProps) {
  return (
    <EnhancedSection
      gridArea="Contribution"
      summary={contribution.contributionCalendar.totalContributions}
      backgroundClass={getContributionLevelBackgroundClass(
        contribution.contributionCalendar.totalContributions
      )}
    >
      <ContributionDetail contribution={contribution} />
    </EnhancedSection>
  );
}

export default ContributionCard;
