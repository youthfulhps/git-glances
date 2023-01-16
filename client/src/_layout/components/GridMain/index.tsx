import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useLogin from '@shared/hooks/useLogin';

type GridMainProps = {
  children: ReactNode;
};

type StyledGridMainProps = {
  isLoggedIn: boolean;
};

const StyledGridMain = styled.main<StyledGridMainProps>`
  ${tw`h-screen w-screen gap-4`}
  ${tw`p-32`};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-template-areas: ${({ isLoggedIn }) => `'${
    isLoggedIn ? 'Profile' : 'login'
  } Contribution . .'
    'Profile Contribution . .'
    'Profile Refactor Daily .'
    'Language Refactor Daily .'
    '. . . .'
    '. . . .'`};
`;

function GridMain({ children }: GridMainProps) {
  const { isLoggedIn } = useLogin();
  return <StyledGridMain isLoggedIn={isLoggedIn}>{children}</StyledGridMain>;
}

export default GridMain;
