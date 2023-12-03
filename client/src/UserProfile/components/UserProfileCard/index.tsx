import React from 'react';
import { User } from '@shared/apis/user';
import FeatureSection from '@layout/components/FeatureSection';
import UserProfileDetail from './UserProfileDetail';

type UserProfileCardProps = {
  user: User;
};

function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <FeatureSection gridArea="Profile" summary={user.login}>
      <UserProfileDetail user={user} />
    </FeatureSection>
  );
}

export default UserProfileCard;
