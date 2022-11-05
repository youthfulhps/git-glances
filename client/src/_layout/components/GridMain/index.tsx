import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

type GridMainProps = {
  children: ReactNode;
};

const StyledGridMain = tw.main`
  grid 
  h-screen 
  w-screen 
  grid-cols-layout 
  grid-rows-layout 
  gap-4 
  p-32 
  grid-areas-layout
`;

function GridMain({ children }: GridMainProps) {
  return <StyledGridMain>{children}</StyledGridMain>;
}

export default GridMain;
