import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useLogin from '@shared/hooks/useLogin';

type GridProps = {
  children: ReactNode;
};

type StyledGridProps = {
  isLoggedIn: boolean;
};

const StyledGrid = styled.div<StyledGridProps>`
  ${tw`h-[460px] w-full gap-4`}
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas: ${({ isLoggedIn }) => `'${
    isLoggedIn ? 'Profile' : 'login'
  } Contribution Notification Trends'
    'Profile Contribution Notification Trends'
    'Profile Refactor Daily Enhance'
    'Language Refactor Daily Enhance'
    `};
`;

function Grid({ children }: GridProps) {
  const { isLoggedIn } = useLogin();
  return <StyledGrid isLoggedIn={isLoggedIn}>{children}</StyledGrid>;
}

export default Grid;
