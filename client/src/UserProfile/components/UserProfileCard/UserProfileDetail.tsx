import React from 'react';
import { User } from '@shared/apis/user';
import { getURLWithProtocol } from '@shared/utils/url';
import { LinkIcon } from '@primer/octicons-react';

type UserProfileDetailProps = {
  user: User;
};

function UserProfileDetail({ user }: UserProfileDetailProps) {
  return (
    <a
      href={getURLWithProtocol(user.html_url)}
      target="_blank"
      rel="noreferrer"
      className="flex h-full w-full flex-col justify-center"
    >
      <div className="flex flex-row items-center justify-start">
        <div className="relative flex-shrink-0 self-start">
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
          <p className="mb-0.5 w-full truncate text-zinc-200">{user.login}</p>
          <p className="w-full truncate text-xs text-zinc-400">{user.bio}</p>
          <a
            href={getURLWithProtocol(user.blog)}
            target="_blank"
            rel="noreferrer"
            className="mt-1 flex w-full items-center justify-start truncate text-xs text-zinc-500 hover:text-zinc-400"
          >
            <LinkIcon className="mr-1 h-2.5 w-2.5 fill-zinc-400" />
            {user.blog}
          </a>
        </div>
      </div>
    </a>
  );
}

export default UserProfileDetail;
