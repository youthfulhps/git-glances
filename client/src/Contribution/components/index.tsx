import { getDateTimeAfterDays, getTodayDateTime } from '@shared/utils/date';
import ContributionCard from './ContributionCard';
import { contributionsQueryOptions } from '../queries/useContributionsCollectionQuery';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { SuspenseQuery } from '@suspensive/react-query';
import ContributionDetail from './ContributionCard/ContributionDetail';
import { mockContributions } from '../mocks/mockContributions';

function Contribution() {
  // 히트맵을 위해 최근 6개월치 데이터 요청
  const from = getDateTimeAfterDays(-180); // 6개월 전
  const to = getTodayDateTime(); // 오늘

  return (
    <SuspenseBoundary
      gridArea="Contribution"
      mockContent={<ContributionDetail contributionsCollection={mockContributions} />}
    >
      <SuspenseQuery {...contributionsQueryOptions(from, to)}>
        {({ data: contributionsCollection }) => (
          <ContributionCard contributionsCollection={contributionsCollection} />
        )}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default Contribution;
