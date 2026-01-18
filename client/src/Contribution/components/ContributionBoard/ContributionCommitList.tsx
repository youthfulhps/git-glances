import React, { useState } from 'react';
import { CommitContributionsByRepository, RepositoryCommit } from '@shared/apis/contribution/types';
import { GitCommitIcon } from '@primer/octicons-react';
import CommitDetailModal from './CommitDetailModal';
import RepositoryCommitGroup from './RepositoryCommitGroup';
import { useRepositoryCommits } from '../../hooks/useRepositoryCommits';

type ContributionCommitListProps = {
  commitContributionsByRepository: CommitContributionsByRepository[];
  dateRange: { from: string; to: string };
};

function ContributionCommitList({
  commitContributionsByRepository,
  dateRange,
}: ContributionCommitListProps) {
  const { repoCommits, toggleRepo } = useRepositoryCommits();
  const [selectedCommit, setSelectedCommit] = useState<{
    owner: string;
    repo: string;
    sha: string;
    message: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (commitContributionsByRepository.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/30 p-6">
        <GitCommitIcon size={24} className="fill-zinc-600" />
        <p className="mt-2 text-xs text-zinc-500">No commits in this period</p>
      </div>
    );
  }

  const handleCommitClick = (commit: RepositoryCommit, owner: string, repo: string) => {
    setSelectedCommit({
      owner,
      repo,
      sha: commit.sha,
      message: commit.commit.message,
    });
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <GitCommitIcon size={14} className="fill-zinc-400" />
        <span className="text-xs font-medium text-zinc-300">Recent Commits by Repository</span>
      </div>

      <div className="flex flex-col gap-2">
        {commitContributionsByRepository.map((repository, index) => {
          const key = `${repository.repository.owner.login}/${repository.repository.name}`;
          const state = repoCommits[key];

          return (
            <RepositoryCommitGroup
              key={index}
              repository={repository}
              isExpanded={state?.expanded || false}
              isLoading={state?.loading || false}
              commits={state?.commits || []}
              onToggle={() => toggleRepo(repository.repository.owner.login, repository.repository.name, dateRange)}
              onCommitClick={(commit) =>
                handleCommitClick(commit, repository.repository.owner.login, repository.repository.name)
              }
            />
          );
        })}
      </div>

      {selectedCommit && (
        <CommitDetailModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          owner={selectedCommit.owner}
          repo={selectedCommit.repo}
          sha={selectedCommit.sha}
          commitMessage={selectedCommit.message}
        />
      )}
    </div>
  );
}

export default ContributionCommitList;
