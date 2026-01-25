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

  const stats = [
    {
      icon: <RepoIcon size={12} className="fill-zinc-400" />,
      label: 'Repos',
      value: formatNumber(user.public_repos),
    },
    {
      icon: <FileCodeIcon size={12} className="fill-zinc-400" />,
      label: 'Gists',
      value: formatNumber(user.public_gists),
    },
    {
      icon: <PeopleIcon size={12} className="fill-zinc-400" />,
      label: 'Followers',
      value: formatNumber(user.followers),
    },
    {
      icon: <StarIcon size={12} className="fill-zinc-400" />,
      label: 'Following',
      value: formatNumber(user.following),
    },
  ];

  return (
    <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <div className="flex items-center gap-1.5">
            {stat.icon}
            <span className="text-xs text-zinc-500">{stat.label}</span>
            <span className="text-sm font-semibold text-zinc-200">{stat.value}</span>
          </div>
          {index < stats.length - 1 && <span className="text-zinc-700">•</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProfileStats;
