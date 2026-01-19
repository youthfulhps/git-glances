import React from 'react';
import { User } from '@shared/apis/user';
import { RepoIcon, PeopleIcon, StarIcon, FileCodeIcon } from '@primer/octicons-react';

type ProfileStatsProps = {
  user: User;
};

function ProfileStats({ user }: ProfileStatsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getYearsOnGitHub = (): number => {
    const createdDate = new Date(user.created_at);
    const now = new Date();
    return now.getFullYear() - createdDate.getFullYear();
  };

  const getJoinDate = (): string => {
    const date = new Date(user.created_at);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const stats = [
    {
      icon: <RepoIcon size={14} className="fill-zinc-400" />,
      label: 'Public Repos',
      value: formatNumber(user.public_repos),
    },
    {
      icon: <FileCodeIcon size={14} className="fill-zinc-400" />,
      label: 'Public Gists',
      value: formatNumber(user.public_gists),
    },
    {
      icon: <PeopleIcon size={14} className="fill-zinc-400" />,
      label: 'Followers',
      value: formatNumber(user.followers),
    },
    {
      icon: <StarIcon size={14} className="fill-zinc-400" />,
      label: 'Following',
      value: formatNumber(user.following),
    },
  ];

  const yearsOnGitHub = getYearsOnGitHub();

  return (
    <div className="flex flex-col gap-3">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3"
          >
            <div className="flex items-center gap-1.5">
              {stat.icon}
              <span className="text-xs text-zinc-500">{stat.label}</span>
            </div>
            <span className="text-xl font-semibold text-zinc-200">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Member Since */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-zinc-500">Member Since</span>
            <span className="text-sm font-medium text-zinc-300">{getJoinDate()}</span>
          </div>
          <div className="rounded-lg bg-zinc-700/50 px-3 py-1.5">
            <span className="text-xs font-medium text-zinc-300">
              {yearsOnGitHub} {yearsOnGitHub === 1 ? 'year' : 'years'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileStats;
