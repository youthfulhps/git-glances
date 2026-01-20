import React from 'react';
import { User } from '@shared/apis/user';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';

type UserProfileSummaryProps = {
  user: User;
};

function UserProfileSummary({ user }: UserProfileSummaryProps) {
  const { openProfileBoard } = useBoard();

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <SectionV2 gridArea="Profile" onClick={openProfileBoard}>
      <div className="flex h-full w-full cursor-pointer flex-col justify-center gap-y-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="relative flex-shrink-0">
            <img
              className="absolute top-0.5 z-10 h-8 w-8 rounded-xl"
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
          <div>
            <div className="flex flex-row items-center gap-1">
              <p className="truncate text-sm font-medium text-zinc-200">
                {user.name || user.login}
              </p>
              <p className="truncate text-xs text-zinc-500">@{user.login}</p>
            </div>
            {user.bio && <p className="line-clamp-2 text-xs text-zinc-400">{user.bio}</p>}
          </div>
        </div>

        <div className="border-t border-zinc-700/30 pt-2">
          <div className="text-[10px] text-zinc-400">
            {formatNumber(user.public_repos)} repos • {formatNumber(user.followers)} followers
          </div>
        </div>
      </div>
    </SectionV2>
  );
}

export default UserProfileSummary;
