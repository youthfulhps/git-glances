import { getDateTimeAfterDays, getTodayDateTime } from '@shared/utils/date';
import ContributionCard from './ContributionCard';
import { contributionsQueryOptions } from '../queries/useContributionsCollectionQuery';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { SuspenseQuery } from '@suspensive/react-query';

function Contribution() {
  const from = getTodayDateTime();
  const to = getDateTimeAfterDays(1);

  return (
    <SuspenseBoundary gridArea="Contribution">
      <SuspenseQuery {...contributionsQueryOptions(from, to)}>
        {({ data: contributionsCollection }) => (
          <ContributionCard contributionsCollection={contributionsCollection} />
        )}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default Contribution;
