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
  ${tw`h-full w-full rounded-2xl`}
  ${tw`bg-zinc-800`}
  grid-area: ${({ gridArea }) => `${gridArea}`};
`;

function Section({ children, className, gridArea }: SectionProps) {
  return (
    <StyledSection className={className} gridArea={gridArea}>
      {children}
    </StyledSection>
  );
}

export default Section;
