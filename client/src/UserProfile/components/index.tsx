import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import UserProfileSummary from './UserProfileSummary';
import { SuspenseQuery } from '@suspensive/react-query';
import { userQueryOptions } from '../queries/useUserQuery';

function UserProfile() {
  return (
    <SuspenseBoundary gridArea="Profile">
      <SuspenseQuery {...userQueryOptions}>
        {({ data: { data: user } }) => <UserProfileSummary user={user} />}
      </SuspenseQuery>
    </SuspenseBoundary>
  );
}

export default UserProfile;
