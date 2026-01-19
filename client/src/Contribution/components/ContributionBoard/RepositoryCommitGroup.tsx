import React from 'react';
import { CommitContributionsByRepository, RepositoryCommit } from '@shared/apis/contribution/types';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import CommitItem from './CommitItem';

type RepositoryCommitGroupProps = {
  repository: CommitContributionsByRepository;
  isExpanded: boolean;
  isLoading: boolean;
  commits: RepositoryCommit[];
  onToggle: () => void;
  onCommitClick: (commit: RepositoryCommit) => void;
};

function RepositoryCommitGroup({
  repository,
  isExpanded,
  isLoading,
  commits,
  onToggle,
  onCommitClick,
}: RepositoryCommitGroupProps) {
  const totalCommits = repository.contributions.nodes.reduce(
    (sum, node) => sum + node.commitCount,
    0
  );
  const repoName = `${repository.repository.owner.login}/${repository.repository.name}`;

  return (
    <div className="flex flex-col gap-2">
      {/* Repository Header */}
      <button
        onClick={onToggle}
        className="group flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3 text-left transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
      >
        {isExpanded ? (
          <ChevronDown size={14} className="text-zinc-500" />
        ) : (
          <ChevronRight size={14} className="text-zinc-500" />
        )}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-zinc-300">{repoName}</span>
            <a
              href={`${repository.repository.url}/commits`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={10} className="text-zinc-500 transition-colors hover:text-zinc-400" />
            </a>
          </div>
          <span className="text-[10px] text-zinc-500">
            {totalCommits} commit{totalCommits !== 1 ? 's' : ''}
          </span>
        </div>
      </button>

      {/* Expanded Commits List */}
      {isExpanded && (
        <div className="ml-4 flex flex-col gap-1.5">
          {isLoading && (
            <div className="flex items-center justify-center py-4 text-xs text-zinc-500">
              Loading commits...
            </div>
          )}

          {!isLoading && commits.length === 0 && (
            <div className="flex items-center justify-center py-4 text-xs text-zinc-500">
              No commits found in this period
            </div>
          )}

          {!isLoading &&
            commits.map((commit) => (
              <CommitItem
                key={commit.sha}
                commit={commit}
                onClick={() => onCommitClick(commit)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default RepositoryCommitGroup;
