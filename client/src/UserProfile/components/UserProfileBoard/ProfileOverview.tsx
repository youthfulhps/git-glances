import React from 'react';
import { User } from '@shared/apis/user';
import {
  LocationIcon,
  OrganizationIcon,
  MailIcon,
  LinkIcon,
  MarkGithubIcon,
} from '@primer/octicons-react';
import { getURLWithProtocol } from '@shared/utils/url';

type ProfileOverviewProps = {
  user: User;
};

function ProfileOverview({ user }: ProfileOverviewProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-700 bg-zinc-800/30 p-4">
      {/* Avatar and Name */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            className="absolute z-10 h-16 w-16 rounded-2xl"
            src={user.avatar_url}
            alt="User avatar"
          />

          <img className="h-16 w-16 rounded-2xl blur-lg" src={user.avatar_url} alt="User avatar" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-zinc-200">{user.name || user.login}</h2>
          <p className="text-sm text-zinc-400">@{user.login}</p>
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-2 transition-colors hover:border-zinc-600"
        >
          <MarkGithubIcon size={16} className="fill-zinc-400" />
        </a>
      </div>

      {/* Bio */}
      {user.bio && <p className="text-sm leading-relaxed text-zinc-300">{user.bio}</p>}

      {/* Details */}
      <div className="flex flex-col gap-2">
        {user.company && (
          <div className="flex items-center gap-2 text-sm">
            <OrganizationIcon size={14} className="flex-shrink-0 fill-zinc-500" />
            <span className="text-zinc-300">{user.company}</span>
          </div>
        )}

        {user.location && (
          <div className="flex items-center gap-2 text-sm">
            <LocationIcon size={14} className="flex-shrink-0 fill-zinc-500" />
            <span className="text-zinc-300">{user.location}</span>
          </div>
        )}

        {user.email && (
          <div className="flex items-center gap-2 text-sm">
            <MailIcon size={14} className="flex-shrink-0 fill-zinc-500" />
            <a href={`mailto:${user.email}`} className="text-zinc-300 hover:text-zinc-200">
              {user.email}
            </a>
          </div>
        )}

        {user.blog && (
          <div className="flex items-center gap-2 text-sm">
            <LinkIcon size={14} className="flex-shrink-0 fill-zinc-500" />
            <a
              href={getURLWithProtocol(user.blog)}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-zinc-300 hover:text-zinc-200"
            >
              {user.blog}
            </a>
          </div>
        )}

        {user.twitter_username && (
          <div className="flex items-center gap-2 text-sm">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 flex-shrink-0 fill-zinc-500"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-zinc-200"
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileOverview;
