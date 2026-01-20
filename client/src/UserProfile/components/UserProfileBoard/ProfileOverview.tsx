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
    <div className="relative flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
      <div className="flex items-center gap-2.5">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-zinc-200">{user.name || user.login}</h2>
          <p className="text-xs text-zinc-400">@{user.login}</p>
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/50 p-1.5 transition-colors hover:border-zinc-600"
        >
          <MarkGithubIcon size={14} className="fill-zinc-400" />
        </a>
      </div>
      {user.bio && <p className="text-xs leading-relaxed text-zinc-300">{user.bio}</p>}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {user.company && (
          <div className="flex items-center gap-1.5">
            <OrganizationIcon size={12} className="flex-shrink-0 fill-zinc-500" />
            <span className="text-zinc-400">{user.company}</span>
          </div>
        )}

        {user.location && (
          <div className="flex items-center gap-1.5">
            <LocationIcon size={12} className="flex-shrink-0 fill-zinc-500" />
            <span className="text-zinc-400">{user.location}</span>
          </div>
        )}

        {user.email && (
          <div className="flex items-center gap-1.5">
            <MailIcon size={12} className="flex-shrink-0 fill-zinc-500" />
            <a href={`mailto:${user.email}`} className="text-zinc-400 hover:text-zinc-300">
              {user.email}
            </a>
          </div>
        )}

        {user.blog && (
          <div className="flex items-center gap-1.5">
            <LinkIcon size={12} className="flex-shrink-0 fill-zinc-500" />
            <a
              href={getURLWithProtocol(user.blog)}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-zinc-400 hover:text-zinc-300"
            >
              {user.blog}
            </a>
          </div>
        )}

        {user.twitter_username && (
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 flex-shrink-0 fill-zinc-500"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-300"
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
