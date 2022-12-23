import { getDateTimeAfterDays, getTodayDateTime } from '@shared/utils/date';
import ContributionCard from './ContributionCard';
import useContributionQuery from '../queries/useContributionQuery';

function Contribution() {
  const { contribution } = useContributionQuery(
    getTodayDateTime(),
    getDateTimeAfterDays(1)
  );

  return <ContributionCard contribution={contribution} />;
}

export default Contribution;
