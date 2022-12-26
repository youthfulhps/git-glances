import React from 'react';
import { User } from '@shared/apis/user';
import EnhancedSection from '@layout/components/EnhancedSection';
import UserProfileDetail from './UserProfileDetail';

type UserProfileCardProps = {
  user: User;
};

function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <EnhancedSection
      gridArea="Profile"
      summary={user.login}
      backgroundImage={user.avatar_url}
      hasOverlay
    >
      <UserProfileDetail user={user} />
    </EnhancedSection>
  );
}

export default UserProfileCard;
