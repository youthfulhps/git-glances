import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

const StyledSection = tw.section`
  h-full 
  w-full 
  rounded-2xl 
  bg-zinc-800 
`;

function Section({ children, className }: SectionProps) {
  return <StyledSection className={className}>{children}</StyledSection>;
}

export default Section;
