import React, { useCallback } from 'react';
import DetailModal from './DetailModal';
import { getCommitDiff } from '@shared/apis/contribution';
import { GitCommitIcon } from '@primer/octicons-react';

type CommitDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  owner: string;
  repo: string;
  sha: string;
  commitMessage?: string;
};

function CommitDetailModal({
  open,
  onOpenChange,
  owner,
  repo,
  sha,
  commitMessage,
}: CommitDetailModalProps) {
  const githubUrl = `https://github.com/${owner}/${repo}/commit/${sha}`;

  const fetchData = useCallback(async () => {
    const { data } = await getCommitDiff(owner, repo, sha);
    return {
      files: data.files,
      stats: data.stats,
    };
  }, [owner, repo, sha]);

  const getReviewContext = useCallback(
    (files: any[]) => ({
      diff: files
        .map((file) => {
          if (!file.patch) return '';
          return `diff --git a/${file.filename} b/${file.filename}\n${file.patch}`;
        })
        .join('\n\n'),
      commitMessage: commitMessage,
    }),
    [commitMessage]
  );

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      githubUrl={githubUrl}
      renderHeader={() => (
        <>
          <GitCommitIcon size={18} className="fill-zinc-400" />
          <span className="font-mono text-sm">{sha.substring(0, 7)}</span>
        </>
      )}
      renderDescription={
        commitMessage
          ? () => <>{commitMessage}</>
          : undefined
      }
      fetchData={fetchData}
      getReviewContext={getReviewContext}
    />
  );
}

export default CommitDetailModal;
