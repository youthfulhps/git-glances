import Section from '@layout/components/Section';
import useUserQuery from '../queries/useUserQuery';
import Avatar from './Avatar';
import Profile from './Profile';

function UserProfile() {
  const { user } = useUserQuery();

  return (
    <Section className="relative" gridArea="user-profile">
      <Avatar avatarUrl={user.avatar_url} />
      <Profile
        userName={user.login}
        bio={user.bio}
        blogURL={user.blog}
        githubURL={user.html_url}
      />
    </Section>
  );
}

export default UserProfile;
