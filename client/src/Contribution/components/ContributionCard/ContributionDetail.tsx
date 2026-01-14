import React from 'react';
import {
  GitPullRequestIcon,
  IssueOpenedIcon,
  GitCommitIcon,
  CodeReviewIcon,
  LockIcon,
} from '@primer/octicons-react';
import { ContributionsCollection } from '@shared/apis/contribution';

type ContributionDetailProps = {
  contributionsCollection: ContributionsCollection;
};

function ContributionDetail({ contributionsCollection }: ContributionDetailProps) {
  const contributionDetailListContents = [
    {
      icon: <GitCommitIcon size={12} />,
      count: contributionsCollection.totalCommitContributions,
      unit: 'Commits',
    },
    {
      icon: <GitPullRequestIcon size={12} />,
      count: contributionsCollection.totalPullRequestContributions,
      unit: 'Pull Requests',
    },
    {
      icon: <CodeReviewIcon size={12} />,
      count: contributionsCollection.totalPullRequestReviewContributions,
      unit: 'Reviews',
    },
    {
      icon: <IssueOpenedIcon size={12} />,
      count: contributionsCollection.totalIssueContributions,
      unit: 'Issues',
    },
    {
      icon: <LockIcon size={12} />,
      count: contributionsCollection.restrictedContributionsCount,
      unit: 'Private Contributions',
    },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <ul className="flex flex-col text-xs [&>li:not(:last-child)]:border-b-[1px] [&>li:not(:last-child)]:border-dashed [&>li:not(:last-child)]:border-zinc-400">
        {contributionDetailListContents.map((contributionDetailContent) => (
          <li
            className="flex w-full items-center justify-between p-1 text-zinc-400"
            key={contributionDetailContent.unit}
          >
            {contributionDetailContent.icon}
            <div>
              <span className="text-zinc-200">{contributionDetailContent.count}</span>
              <span className="text-xs font-thin">{` ${contributionDetailContent.unit}`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContributionDetail;
