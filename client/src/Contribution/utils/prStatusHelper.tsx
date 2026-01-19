import React from 'react';
import { GitPullRequestIcon, GitMergeIcon, GitPullRequestClosedIcon } from '@primer/octicons-react';

export const getPRIcon = (state: string, mergedAt: string | null) => {
  const isMerged = !!mergedAt;

  if (isMerged || state === 'MERGED') {
    return <GitMergeIcon size={14} className="fill-purple-400" />;
  }
  if (state === 'CLOSED') {
    return <GitPullRequestClosedIcon size={14} className="fill-red-400" />;
  }
  return <GitPullRequestIcon size={14} className="fill-emerald-400" />;
};

export const getPRStateColor = (state: string, mergedAt: string | null): string => {
  const isMerged = !!mergedAt;

  if (isMerged || state === 'MERGED') return 'text-purple-400';
  if (state === 'CLOSED') return 'text-red-400';
  return 'text-emerald-400';
};

export const getPRStateText = (state: string, mergedAt: string | null): string => {
  if (mergedAt) return 'Merged';
  if (state === 'CLOSED') return 'Closed';
  return 'Open';
};

export const extractPRNumber = (url: string): string | undefined => {
  return url.split('/').pop();
};
