import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type StyledSectionProps = {
  gridArea?: string;
};

type SectionProps = {
  children: ReactNode;
  className?: string;
} & StyledSectionProps;

const StyledSection = styled.section<StyledSectionProps>`
  ${tw`flex flex-col h-full w-full rounded-2xl`}
  ${tw`bg-zinc-800 text-zinc-100`}
  
  grid-area: ${({ gridArea }) => `${gridArea}`};

  h2 {
    ${tw`absolute top-4 left-4`}
    ${tw`text-xl font-thin`}
    ${tw`duration-500`}
    ${tw`drop-shadow-md`}
  }
`;

function Section({ children, className, gridArea }: SectionProps) {
  return (
    <StyledSection className={className} gridArea={gridArea}>
      <h2>{`# ${gridArea}`}</h2>
      {children}
    </StyledSection>
  );
}

export default Section;
