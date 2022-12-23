import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type StyledEnhancedEnhancedSectionProps = {
  gridArea: string;
  backgroundClass?: string;
};

type EnhancedSectionProps = {
  children?: ReactNode;
  className?: string;
  summary: string;
} & StyledEnhancedEnhancedSectionProps;

const StyledEnhancedSection = styled.section<StyledEnhancedEnhancedSectionProps>`
  ${tw`relative h-full w-full p-4 rounded-2xl overflow-hidden`}
  grid-area: ${({ gridArea }) => `${gridArea}`};
  ${tw`hover:bg-indigo-500/[0.6]`}
  ${tw`duration-500 delay-500`}
  ${({ backgroundClass }) => !backgroundClass && tw`bg-zinc-800`}
  ${tw`text-zinc-100`}

  h2 {
    ${tw`absolute top-4 left-4`}
    ${tw`text-xl font-thin`}
    ${tw`duration-500`}
  }

  .inner {
    ${tw`absolute top-[calc(100%_-_72px)] left-0 w-full h-full p-4`}
    ${tw`flex flex-col justify-between`}
    ${tw`duration-700`}
    ${tw`text-right`}

    h3 {
      ${tw`text-5xl font-bold`}
      ${tw`mb-6`}
      ${tw`opacity-80`}
      ${tw`duration-500`}
    }
  }

  &:hover {
    h2 {
      ${tw`-top-10`}
    }

    .inner {
      ${tw`top-0`}
      ${tw`bg-zinc-700/[0.5]`}
      
      h3 {
        ${tw`mb-1`}
      }
    }
  }
`;

function EnhancedSection({
  gridArea,
  children,
  className,
  summary,
  backgroundClass,
}: EnhancedSectionProps) {
  return (
    <StyledEnhancedSection
      gridArea={gridArea}
      className={`${className} ${backgroundClass}`}
      backgroundClass={backgroundClass}
    >
      <h2>{`# ${gridArea}`}</h2>
      <div className="inner">
        <h3>{summary}</h3>
        <div>{children}</div>
      </div>
    </StyledEnhancedSection>
  );
}

export default EnhancedSection;