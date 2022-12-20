import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getContributionLevelBackgroundClass } from '../utils/contributionStyleHelper';

type TodayContributionProps = {
  contribution: any;
};

const StyledTodayContribution = styled.div`
  ${tw`flex items-end justify-end`};
  ${tw`h-full w-full p-3 rounded-2xl`};
  ${tw`hover:animate-pulse`}
`;

const TodayContributionCount = styled.span`
  ${tw`text-6xl font-black drop-shadow-lg text-zinc-300`};
  ${tw`transition-none`}
`;

function TodayContribution({ contribution }: TodayContributionProps) {
  return (
    <StyledTodayContribution
      className={getContributionLevelBackgroundClass(
        contribution.contributionCalendar.totalContributions
      )}
    >
      <TodayContributionCount>
        {contribution.contributionCalendar.totalContributions}
      </TodayContributionCount>
    </StyledTodayContribution>
  );
}

export default TodayContribution;
