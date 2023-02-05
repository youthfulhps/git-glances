import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type FlexMainProps = {
  children: ReactNode;
};

const StyledFlexMain = styled.main`
  ${tw`flex h-screen w-screen items-center justify-center bg-zinc-800`}
`;

function FlexMain({ children }: FlexMainProps) {
  return <StyledFlexMain>{children}</StyledFlexMain>;
}

export default FlexMain;
