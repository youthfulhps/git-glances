import React from 'react';
import { RepositoryCommit } from '@shared/apis/contribution/types';
import { GitCommitIcon } from '@primer/octicons-react';
import { formatCommitDate, formatSHA } from '../../utils/dateHelper';

type CommitItemProps = {
  commit: RepositoryCommit;
  onClick: () => void;
};

function CommitItem({ commit, onClick }: CommitItemProps) {
  const commitTitle = commit.commit.message.split('\n')[0];

  return (
    <button
      onClick={onClick}
      className="group flex items-start gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-2.5 text-left transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
    >
      <GitCommitIcon size={12} className="mt-0.5 shrink-0 fill-zinc-500" />
      <div className="flex flex-1 flex-col gap-1">
        <span className="line-clamp-2 text-xs text-zinc-300">{commitTitle}</span>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="font-mono text-zinc-500">{formatSHA(commit.sha)}</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-500">{formatCommitDate(commit.commit.author.date)}</span>
        </div>
      </div>
    </button>
  );
}

export default CommitItem;
