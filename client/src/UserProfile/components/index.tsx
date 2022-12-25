import useUserQuery from '../queries/useUserQuery';
import UserProfileCard from './UserProfileCard';

function UserProfile() {
  const user = useUserQuery();

  return <UserProfileCard user={user} />;
}

export default UserProfile;
