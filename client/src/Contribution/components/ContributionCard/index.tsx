import React from 'react';
import { ContributionsCollection } from '@shared/apis/contribution';
import ContributionDetail from './ContributionDetail';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';

type ContributionCardProps = {
  contributionsCollection: ContributionsCollection;
};

function ContributionCard({ contributionsCollection }: ContributionCardProps) {
  const { openContributionBoard } = useBoard();

  const handleClick = () => {
    openContributionBoard();
  };

  return (
    <SectionV2 gridArea="Contribution" hasBackground={false} onClick={handleClick}>
      <ContributionDetail contributionsCollection={contributionsCollection} />
    </SectionV2>
  );
}

export default ContributionCard;
