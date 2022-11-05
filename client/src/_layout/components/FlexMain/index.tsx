import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

type FlexMainProps = {
  children: ReactNode;
};

const StyledFlexMain = tw.main`
  flex 
  h-screen 
  w-screen 
  items-center 
  justify-center
`;

function FlexMain({ children }: FlexMainProps) {
  return <StyledFlexMain>{children}</StyledFlexMain>;
}

export default FlexMain;
