import React from 'react';
import { Repository } from '@shared/apis/repo';
import { RepoIcon, CommitIcon } from '@primer/octicons-react';
import { getRelativeTimeFromNow } from '@shared/utils/date';
import classNames from 'classnames';

type RepositoryDetailProps = {
  repository: Repository;
  className?: string;
};

function RepositoryDetail({ repository, className = '' }: RepositoryDetailProps) {
  const latestCommit = repository.defaultBranchRef.target.history.nodes[0];

  return (
    <div className={classNames('text-start', className)}>
      <div className="mb-3 flex">
        <RepoIcon className="mr-2 fill-emerald-300" />
        <a className="hover:text-zinc-400" href={repository.url}>
          {repository.name}
        </a>
      </div>
      <div>
        <div className="mb-1 flex text-xs">
          <CommitIcon className="mr-2 fill-emerald-300" />
          <a href={latestCommit.url} className="block w-full truncate hover:text-zinc-400">
            {latestCommit.message}
          </a>
        </div>
        <div className="ml-6">
          <div className="flex items-center text-xs">
            <img
              src={latestCommit.author.avatarUrl}
              alt="Git actor avatar"
              className="mr-2 h-4 w-4 rounded-full"
            />
            <p className="truncate text-zinc-400">
              committed {getRelativeTimeFromNow(latestCommit.committedDate)}
            </p>
          </div>
          <div className="mb-1 ml-6 flex items-center text-xs text-zinc-400">
            <p className="truncate">
              with
              <span className="pl-1 pr-[2px] text-emerald-500">{latestCommit.additions}</span>
              additions and
              <span className="pl-1 pr-[2px] text-red-500">{latestCommit.deletions}</span>
              deletions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepositoryDetail;
