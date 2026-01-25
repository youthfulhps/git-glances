import React from 'react';
import { PullRequest } from '@shared/apis/contribution/types';
import { getPRIcon, getPRStateColor, getPRStateText } from '../../utils/prStatusHelper';
import classNames from 'classnames';

type PRItemProps = {
  pullRequest: PullRequest;
  onClick: () => void;
};

function PRItem({ pullRequest, onClick }: PRItemProps) {
  const isMerged = !!pullRequest.mergedAt;

  return (
    <button
      onClick={onClick}
      className="animate-fadeInUp group flex flex-col gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3 text-left transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-1 items-start gap-1.5">
          {getPRIcon(pullRequest.state, pullRequest.mergedAt)}
          <span className="line-clamp-2 text-xs text-zinc-300">{pullRequest.title}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px]">
        <span className="text-zinc-500">
          {pullRequest.repository.owner.login}/{pullRequest.repository.name}
        </span>
        <span className="text-zinc-700">•</span>
        <span className={classNames('font-medium', getPRStateColor(pullRequest.state, pullRequest.mergedAt))}>
          {getPRStateText(pullRequest.state, pullRequest.mergedAt)}
        </span>
      </div>
    </button>
  );
}

export default PRItem;
