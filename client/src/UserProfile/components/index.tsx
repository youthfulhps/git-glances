import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import UserProfileCard from './UserProfileCard';
import { SuspenseQuery } from '@suspensive/react-query';
import { userQueryOptions } from '../queries/useUserQuery';

function UserProfile() {
  return (
    <>
      랜더링중
      <SuspenseBoundary gridArea="Profile">
        <SuspenseQuery {...userQueryOptions}>
          {({ data: { data: user } }) => <UserProfileCard user={user} />}
        </SuspenseQuery>
      </SuspenseBoundary>
    </>
  );
}

export default UserProfile;
