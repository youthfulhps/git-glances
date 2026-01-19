import React from 'react';
import {
  GitCommitIcon,
  GitPullRequestIcon,
  EyeIcon,
  IssueOpenedIcon,
} from '@primer/octicons-react';

type ContributionStatsProps = {
  totalCommits: number;
  totalPRs: number;
  totalReviews: number;
  totalIssues: number;
  totalPrivate: number;
};

function ContributionStats({
  totalCommits,
  totalPRs,
  totalReviews,
  totalIssues,
  totalPrivate,
}: ContributionStatsProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
      <div className="flex items-center gap-1.5">
        <GitCommitIcon size={14} className="fill-zinc-400" />
        <span className="text-xs text-zinc-400">Commits</span>
        <span className="text-sm font-semibold text-zinc-200">{totalCommits}</span>
      </div>
      <span className="text-zinc-700">•</span>
      <div className="flex items-center gap-1.5">
        <GitPullRequestIcon size={14} className="fill-zinc-400" />
        <span className="text-xs text-zinc-400">PRs</span>
        <span className="text-sm font-semibold text-zinc-200">{totalPRs}</span>
      </div>
      <span className="text-zinc-700">•</span>
      <div className="flex items-center gap-1.5">
        <EyeIcon size={14} className="fill-zinc-400" />
        <span className="text-xs text-zinc-400">Reviews</span>
        <span className="text-sm font-semibold text-zinc-200">{totalReviews}</span>
      </div>
      <span className="text-zinc-700">•</span>
      <div className="flex items-center gap-1.5">
        <IssueOpenedIcon size={14} className="fill-zinc-400" />
        <span className="text-xs text-zinc-400">Issues</span>
        <span className="text-sm font-semibold text-zinc-200">{totalIssues}</span>
      </div>
      {totalPrivate > 0 && (
        <>
          <span className="text-zinc-700">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400">Private</span>
            <span className="text-sm font-semibold text-zinc-200">{totalPrivate}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default ContributionStats;
