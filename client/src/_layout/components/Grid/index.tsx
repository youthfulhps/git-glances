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
  ${tw`w-full h-full gap-4`}
  display: grid;

  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(16, 111px);

  grid-template-areas: ${({ isLoggedIn }) => `'${isLoggedIn ? 'Profile' : 'login'}'
    'Profile'
    'Profile'
    'Language'
    'Contribution'
    'Contribution'
    'Notification'
    'Notification'
    'Refactor'
    'Refactor'
    'Trends'
    'Trends'
    'Daily'
    'Daily'
    'Enhance'
    'Enhance'
    `};

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, 111px);
    grid-template-areas: ${({ isLoggedIn }) => `'${isLoggedIn ? 'Profile' : 'login'} Contribution'
    'Profile Contribution'
    'Profile Notification'
    'Language Notification'
    'Refactor Trends'
    'Refactor Trends'
    'Daily Enhance'
    'Daily Enhance'
    `};
  }

  @media only screen and (min-width: 1024px) {
    height: 460px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-template-areas: ${({ isLoggedIn }) => `'${
      isLoggedIn ? 'Profile' : 'login'
    } Contribution Notification Trends'
    'Profile Contribution Notification Trends'
    'Profile Refactor Daily Enhance'
    'Language Refactor Daily Enhance'
    `};
  }
`;

function Grid({ children }: GridProps) {
  const { isLoggedIn } = useLogin();
  return <StyledGrid isLoggedIn={isLoggedIn}>{children}</StyledGrid>;
}

export default Grid;
