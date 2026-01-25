import React from 'react';
import { PullRequest } from '@shared/apis/pullrequest/types';
import { getRelativeTimeFromNow } from '@shared/utils/date';
import { GitPullRequestIcon, RepoIcon } from '@primer/octicons-react';

type PullRequestItemProps = {
  pullRequest: PullRequest;
};

function PullRequestItem({ pullRequest }: PullRequestItemProps) {
  const handleClick = () => {
    window.open(pullRequest.html_url, '_blank');
  };

  return (
    <div
      className="animate-fadeInUp flex cursor-pointer flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-3 hover:border-zinc-600"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <RepoIcon className="fill-zinc-200" size={12} />
          <span className="text-xs text-zinc-200">
            {pullRequest.base?.repo?.full_name || 'Unknown repo'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitPullRequestIcon className="fill-emerald-400" size={12} />
          <h3 className="text-xs font-medium text-zinc-300">{pullRequest.title}</h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-400">#{pullRequest.number}</span>
        {pullRequest.draft && (
          <span className="rounded-lg bg-zinc-700/50 px-2 py-0.5 text-xs text-zinc-400">
            Draft
          </span>
        )}
        {pullRequest.labels.slice(0, 2).map((label) => (
          <span
            key={label.id}
            className="rounded-lg px-2 py-0.5 text-xs text-zinc-300"
            style={{
              backgroundColor: `#${label.color}20`,
              borderColor: `#${label.color}40`,
              borderWidth: '1px',
            }}
          >
            {label.name}
          </span>
        ))}
        <span className="ml-auto text-xs text-zinc-500">
          {getRelativeTimeFromNow(pullRequest.updated_at)}
        </span>
      </div>
    </div>
  );
}

export default PullRequestItem;
