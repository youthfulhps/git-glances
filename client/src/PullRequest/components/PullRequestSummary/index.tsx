import React from 'react';
import { GitPullRequestIcon } from '@primer/octicons-react';
import ShinyText from '@shared/components/ShinyText/ShinyText';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';
import PullRequestInfiniteQuery from '../PullRequestInfiniteQuery';
import { PullRequest } from '@shared/apis/pullrequest';
import { mockPullRequests } from '../../mocks/mockPullRequests';

function PullRequestSummary() {
  const { openPullRequestBoard } = useBoard();

  const handleClick = () => {
    openPullRequestBoard();
  };

  return (
    <PullRequestInfiniteQuery
      gridArea="PullRequest"
      mockContent={
        <SectionV2 onClick={handleClick} gridArea="PullRequest">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-x-1.5">
              <GitPullRequestIcon size={10} className="fill-zinc-300" />
              <ShinyText
                text={`${mockPullRequests.length} review${mockPullRequests.length > 1 ? 's' : ''} requested`}
                className="text-xs text-zinc-200"
              />
            </div>
          </div>
        </SectionV2>
      }
    >
      {({ data }) => {
        const pages = (data as { pages?: Array<{ pullRequests: PullRequest[] }> })?.pages;
        const allPRs = pages?.flatMap((page) => page.pullRequests) ?? [];
        const prCount = allPRs.length;

        return (
          <SectionV2 onClick={handleClick} gridArea="PullRequest">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center gap-x-1.5">
                <GitPullRequestIcon size={10} className="fill-zinc-300" />
                <ShinyText
                  text={
                    prCount > 0
                      ? `${prCount} review${prCount > 1 ? 's' : ''} requested`
                      : 'No reviews requested'
                  }
                  className={prCount > 0 ? 'text-xs text-zinc-200' : 'text-xs text-zinc-500'}
                />
              </div>
            </div>
          </SectionV2>
        );
      }}
    </PullRequestInfiniteQuery>
  );
}

export default PullRequestSummary;
