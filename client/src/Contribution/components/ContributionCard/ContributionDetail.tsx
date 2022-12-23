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

type ContributionDetailProps = {
  contribution: any;
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

function ContributionDetail({ contribution }: ContributionDetailProps) {
  const contributionDetailListContents = [
    {
      icon: <GitCommitIcon size={12} />,
      count: contribution.totalCommitContributions,
      unit: 'Commits',
    },
    {
      icon: <GitPullRequestIcon size={12} />,
      count: contribution.totalPullRequestContributions,
      unit: 'Pull Requests',
    },
    {
      icon: <CodeReviewIcon size={12} />,
      count: contribution.totalPullRequestReviewContributions,
      unit: 'Reviews',
    },
    {
      icon: <IssueOpenedIcon size={12} />,
      count: contribution.totalIssueContributions,
      unit: 'Issues',
    },
    {
      icon: <LockIcon size={12} />,
      count: contribution.restrictedContributionsCount,
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
            <span className="font-thin">{` ${contributionDetailContent.unit}`}</span>
          </div>
        </li>
      ))}
    </StyledContributionDetail>
  );
}

export default ContributionDetail;
