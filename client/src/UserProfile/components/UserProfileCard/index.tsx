import React from 'react';
import { User } from '@shared/apis/user';
import SectionV2 from '@layout/components/SectionV2';
import UserProfileDetail from './UserProfileDetail';

type UserProfileCardProps = {
  user: User;
};

function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <SectionV2 gridArea="Profile">
      <UserProfileDetail user={user} />
    </SectionV2>
  );
}

export default UserProfileCard;
