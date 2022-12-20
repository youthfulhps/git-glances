import Section from '@layout/components/Section';
import { getDateTimeAfterDays, getTodayDateTime } from '@shared/utils/date';
import useContributionQuery from '../queries/useContributionQuery';
import TodayContribution from './TodayContribution';

function Contribution() {
  const { contribution } = useContributionQuery(
    getTodayDateTime(),
    getDateTimeAfterDays(1)
  );

  return (
    <Section gridArea="contribution">
      <TodayContribution contribution={contribution} />
    </Section>
  );
}

export default Contribution;
