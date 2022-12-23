import { getDateTimeAfterDays, getTodayDateTime } from '@shared/utils/date';
import ContributionCard from './ContributionCard';
import useContributionsCollectionQuery from '../queries/useContributionsCollectionQuery';

function Contribution() {
  const contributionsCollection = useContributionsCollectionQuery(
    getTodayDateTime(),
    getDateTimeAfterDays(1)
  );

  return <ContributionCard contributionsCollection={contributionsCollection} />;
}

export default Contribution;
