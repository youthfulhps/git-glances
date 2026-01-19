import React, { useCallback } from 'react';
import DetailModal from './DetailModal';
import { getPullRequestFiles } from '@shared/apis/contribution';
import { PullRequest } from '@shared/apis/contribution/types';
import { getPRIcon, getPRStateColor, getPRStateText, extractPRNumber } from '../../utils/prStatusHelper';
import classNames from 'classnames';

type PRDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pullRequest: PullRequest;
};

function PRDetailModal({ open, onOpenChange, pullRequest }: PRDetailModalProps) {
  const owner = pullRequest.repository.owner.login;
  const repo = pullRequest.repository.name;
  const prNumber = extractPRNumber(pullRequest.url);
  const githubUrl = pullRequest.url;

  const fetchData = useCallback(async () => {
    const { data } = await getPullRequestFiles(owner, repo, parseInt(prNumber!));
    return {
      files: data,
    };
  }, [owner, repo, prNumber]);

  const getReviewContext = useCallback(
    (files: any[]) => ({
      diff: files
        .map((file) => {
          if (!file.patch) return '';
          return `diff --git a/${file.filename} b/${file.filename}\n${file.patch}`;
        })
        .join('\n\n'),
      prTitle: pullRequest.title,
    }),
    [pullRequest.title]
  );

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      githubUrl={githubUrl}
      renderHeader={() => (
        <>
          {getPRIcon(pullRequest.state, pullRequest.mergedAt)}
          <span>{pullRequest.title}</span>
        </>
      )}
      renderDescription={() => (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">
            {owner}/{repo} #{prNumber}
          </span>
          <span className="text-zinc-700">•</span>
          <span className={classNames('font-medium', getPRStateColor(pullRequest.state, pullRequest.mergedAt))}>
            {getPRStateText(pullRequest.state, pullRequest.mergedAt)}
          </span>
        </div>
      )}
      fetchData={fetchData}
      getReviewContext={getReviewContext}
    />
  );
}

export default PRDetailModal;
