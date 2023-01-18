import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
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

const StyledContributionDetail = styled.ul`
  ${tw`flex flex-col`}
  ${tw`text-sm`}
  
  & > li:not(:last-child) {
    ${tw`border-dashed border-b-[1px] border-zinc-400`}
  }

  li {
    ${tw`flex items-center justify-between w-full`}
    ${tw`p-1`}
  }

  svg {
    ${tw`fill-emerald-300`}
  }
`;

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
    <StyledContributionDetail>
      {contributionDetailListContents.map((contributionDetailContent) => (
        <li key={contributionDetailContent.unit}>
          {contributionDetailContent.icon}
          <div>
            <span>{contributionDetailContent.count}</span>
            <span className="text-xs font-thin">{` ${contributionDetailContent.unit}`}</span>
          </div>
        </li>
      ))}
    </StyledContributionDetail>
  );
}

export default ContributionDetail;
