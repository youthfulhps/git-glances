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
  ${tw`flex flex-col h-full w-full p-4 rounded-2xl overflow-hidden`}
  ${tw`bg-zinc-800 text-zinc-100`}
  
  grid-area: ${({ gridArea }) => `${gridArea}`};

  h2 {
    ${tw`text-xl font-thin`}
    ${tw`drop-shadow-md`}
  }

  .inner {
    ${tw`w-full h-full overflow-y-scroll`}
  }
`;

function Section({ children, className, gridArea }: SectionProps) {
  return (
    <StyledSection className={className} gridArea={gridArea}>
      <h2>{`# ${gridArea}`}</h2>
      <div className="inner">{children}</div>
    </StyledSection>
  );
}

export default Section;
