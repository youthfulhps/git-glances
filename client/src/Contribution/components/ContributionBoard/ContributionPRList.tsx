import React, { useState } from 'react';
import { PullRequestContribution, PullRequest } from '@shared/apis/contribution/types';
import { GitPullRequestIcon } from '@primer/octicons-react';
import PRDetailModal from './PRDetailModal';
import PRItem from './PRItem';

type ContributionPRListProps = {
  pullRequestContributions: PullRequestContribution[];
};

function ContributionPRList({ pullRequestContributions }: ContributionPRListProps) {
  const [selectedPR, setSelectedPR] = useState<PullRequest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (pullRequestContributions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/30 p-6">
        <GitPullRequestIcon size={24} className="fill-zinc-600" />
        <p className="mt-2 text-xs text-zinc-500">No pull requests in this period</p>
      </div>
    );
  }

  // Limit to 10 most recent PRs
  const recentPRs = pullRequestContributions.slice(0, 10);

  const handlePRClick = (pr: PullRequest) => {
    setSelectedPR(pr);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <GitPullRequestIcon size={14} className="fill-zinc-400" />
        <span className="text-xs font-medium text-zinc-300">Recent Pull Requests</span>
      </div>

      <div className="flex flex-col gap-2">
        {recentPRs.map((contribution, index) => (
          <PRItem
            key={index}
            pullRequest={contribution.pullRequest}
            onClick={() => handlePRClick(contribution.pullRequest)}
          />
        ))}
      </div>

      {selectedPR && (
        <PRDetailModal open={modalOpen} onOpenChange={setModalOpen} pullRequest={selectedPR} />
      )}
    </div>
  );
}

export default ContributionPRList;
