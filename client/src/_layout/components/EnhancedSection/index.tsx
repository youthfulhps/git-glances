import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type StyledEnhancedEnhancedSectionProps = {
  gridArea?: string;
};

type EnhancedSectionProps = {
  children?: ReactNode;
  className?: string;
  label: string;
  mainContent: string;
} & StyledEnhancedEnhancedSectionProps;

const StyledEnhancedSection = styled.section<StyledEnhancedEnhancedSectionProps>`
  ${tw`relative h-full w-full p-4 rounded-2xl overflow-hidden`}
  grid-area: ${({ gridArea }) => `${gridArea}`};
  ${tw`hover:bg-indigo-500/[0.6]`}
  ${tw`duration-500 delay-500`}
  ${tw`bg-zinc-800`}

  .inner {
    ${tw`absolute top-0 left-0 w-full h-[calc(100%_+_28px)] p-4`}
    ${tw`flex flex-col justify-end`}
    ${tw`duration-500`}
    ${tw`text-right`}

    h2 {
      ${tw`absolute top-4 left-4`}
      ${tw`text-xl text-zinc-200 font-thin`}
    }

    h3 {
      ${tw`text-5xl text-zinc-200 font-bold`}
      ${tw`mb-6`}
      ${tw`opacity-80`}
    }
  }

  &:hover {
    .inner {
      ${tw`-top-10`}

      h2 {
        ${tw`opacity-100`}
      }
    }
  }
`;

function EnhancedSection({
  children,
  className,
  label,
  mainContent,
  gridArea,
}: EnhancedSectionProps) {
  return (
    <StyledEnhancedSection className={className} gridArea={gridArea}>
      <div className="inner">
        <h2>{`# ${label}`}</h2>
        <h3>{mainContent}</h3>
        {children}
      </div>
    </StyledEnhancedSection>
  );
}

export default EnhancedSection;
