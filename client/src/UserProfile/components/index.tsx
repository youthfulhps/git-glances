import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import UserProfileSummary from './UserProfileSummary';
import { SuspenseQuery } from '@suspensive/react-query';
import { userQueryOptions } from '../queries/useUserQuery';
import { mockUser } from '../mocks/mockUser';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';

function UserProfile() {
  const { openProfileBoard } = useBoard();
  return (
    <SuspenseBoundary gridArea="Profile" mockContent={<UserProfileSummary user={mockUser} />}>
      <SuspenseQuery {...userQueryOptions}>
        {({ data: { data: user } }) => (
          <SectionV2 gridArea="Profile" onClick={openProfileBoard}>
            <UserProfileSummary user={user} />
          </SectionV2>
        )}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default UserProfile;
