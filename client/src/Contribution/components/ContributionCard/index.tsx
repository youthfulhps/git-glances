import React from 'react';
import { ContributionsCollection } from '@shared/apis/contribution';
import ContributionDetail from './ContributionDetail';
import SectionV2 from '@layout/components/SectionV2';

type ContributionCardProps = {
  contributionsCollection: ContributionsCollection;
};

function ContributionCard({ contributionsCollection }: ContributionCardProps) {
  return (
    <SectionV2 gridArea="Contribution">
      <ContributionDetail contributionsCollection={contributionsCollection} />
    </SectionV2>
  );
}

export default ContributionCard;
