import { getDateTimeAfterDays, getTodayDateTime } from '@shared/utils/date';
import ContributionCard from './ContributionCard';
import useContributionsCollectionQuery from '../queries/useContributionsCollectionQuery';

function Contribution() {
  const { contribution } = useContributionsCollectionQuery(
    getTodayDateTime(),
    getDateTimeAfterDays(1)
  );

  return <ContributionCard contribution={contribution} />;
}

export default Contribution;
