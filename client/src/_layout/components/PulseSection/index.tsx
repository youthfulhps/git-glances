import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type PulseProps = {
  gridArea?: string;
};

const StyledSection = styled.section<PulseProps>`
  ${tw`relative flex flex-col h-full w-full p-4 rounded-2xl overflow-hidden animate-pulse`}
  ${tw`bg-zinc-800 text-zinc-100`}
  ${tw`border border-solid border-zinc-500`}
  
  grid-area: ${({ gridArea }) => `${gridArea}`};

  h2 {
    ${tw`absolute top-4 left-4`}
    ${tw`text-xl font-thin`}
    ${tw`drop-shadow-md`}
  }
`;

function Pulse({ gridArea }: PulseProps) {
  return (
    <StyledSection gridArea={gridArea}>
      <h2>{`# ${gridArea}`}</h2>
    </StyledSection>
  );
}

export default Pulse;
