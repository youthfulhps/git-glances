import React from 'react';
import { Repository } from '@shared/apis/repo';
import { RepoIcon, CommitIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getRelativeTimeFromNow } from '@shared/utils/date';

type RepositoryDetailProps = {
  repository: Repository;
};

const StyledRepositoryDetail = styled.div`
  ${tw`text-start`};

  svg {
    ${tw`fill-emerald-300`}
    ${tw`mr-2`}
  }

  a {
    ${tw`hover:text-zinc-400`}
  }
`;

function RepositoryDetail({ repository }: RepositoryDetailProps) {
  const latestCommit = repository.defaultBranchRef.target.history.nodes[0];

  return (
    <StyledRepositoryDetail>
      <div className="mb-3 flex">
        <RepoIcon />
        <a href={repository.url}>{repository.name}</a>
      </div>
      <div>
        <div className="mb-1 flex text-xs">
          <CommitIcon />
          <a href={latestCommit.url} className="block w-full truncate">
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
              <span className="pl-1 pr-[2px] text-emerald-500">
                {latestCommit.additions}
              </span>
              additions and
              <span className="pl-1 pr-[2px] text-red-500">
                {latestCommit.deletions}
              </span>
              deletions.
            </p>
          </div>
        </div>
      </div>
    </StyledRepositoryDetail>
  );
}

export default RepositoryDetail;
