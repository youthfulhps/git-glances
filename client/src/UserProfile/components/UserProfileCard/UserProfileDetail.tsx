import React from 'react';
import { User } from '@shared/apis/user';
import { getURLWithProtocol } from '@shared/utils/url';

type UserProfileDetailProps = {
  user: User;
};

function UserProfileDetail({ user }: UserProfileDetailProps) {
  return (
    <a
      href={getURLWithProtocol(user.html_url)}
      target="_blank"
      rel="noreferrer"
      className="flex h-full w-full flex-col justify-center p-3"
    >
      <div className="flex flex-row items-center justify-start">
        <div className="relative flex-shrink-0">
          <img
            className="absolute z-10 h-8 w-8 rounded-xl"
            fetchPriority="high"
            src={user.avatar_url}
            alt="User avatar"
          />

          <img
            className="h-9 w-9 rounded-2xl blur-lg"
            fetchPriority="high"
            src={user.avatar_url}
            alt="User avatar"
          />
        </div>
        <div className="ml-1 flex min-w-0 flex-1 flex-col items-start justify-start">
          <p className="mb-0.5 w-full truncate text-zinc-200">{user.name}</p>
          <p className="w-full truncate text-xs text-zinc-400">{user.bio}</p>
        </div>
      </div>
    </a>
  );
}

export default UserProfileDetail;
