import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type FeatureSectionProps = {
  children?: ReactNode;
  className?: string;
  summary: ReactNode;
  summaryType?: 'string' | 'icon';
  gridArea: string;
  backgroundClass?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  hasOverlay?: boolean;
};

const StyledFeatureSection = styled.section<FeatureSectionProps>`
  ${tw`relative h-full w-full rounded-2xl overflow-hidden`}
  grid-area: ${({ gridArea }) => `${gridArea}`};
  ${tw`duration-500 delay-500`}
  ${tw`text-zinc-100`}
  ${tw`hover:bg-indigo-500/[0.6]`}
  ${tw`drop-shadow-md backdrop-brightness-50`}

  ${({ backgroundClass }) => !backgroundClass && tw`bg-zinc-800`}
  
  background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};

  background-image: ${({ backgroundImage }) => backgroundImage && `url(${backgroundImage})`};

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  h2 {
    ${tw`absolute top-4 left-4`}
    ${tw`text-xl font-thin`}
    ${tw`duration-500`}
    ${tw`drop-shadow-md`}
  }

  .overlay {
    ${({ hasOverlay }) => hasOverlay && tw`backdrop-brightness-50`}
    ${tw`h-full w-full p-4`}
  }

  .inner {
    ${tw`absolute top-[calc(100%_-_72px)] left-0 w-full h-full p-4`}
    ${tw`flex flex-col justify-between`}
    ${tw`duration-700`}
    ${tw`text-right`}
    
    ${({ summaryType }) => summaryType === 'icon' && tw`top-[calc(100%_-_80px)]`};

    h3 {
      ${tw`text-5xl font-bold text-clip overflow-hidden whitespace-pre-wrap`}
      ${tw`opacity-80`}
      ${tw`duration-500`}
    }

    .summary-icon {
      ${tw`flex flex-col items-end`}
    }
  }

  &:hover {
    background-image: unset;
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

function FeatureSection({
  gridArea,
  children,
  className = '',
  summary,
  summaryType = 'string',
  backgroundClass = '',
  backgroundImage = '',
  backgroundColor = '',
  hasOverlay = false,
}: FeatureSectionProps) {
  return (
    <StyledFeatureSection
      gridArea={gridArea}
      className={`${className} ${backgroundClass}`}
      backgroundClass={backgroundClass}
      backgroundImage={backgroundImage}
      backgroundColor={backgroundColor}
      summary={summary}
      summaryType={summaryType}
      hasOverlay={hasOverlay}
    >
      <div className="overlay">
        <h2>{`# ${gridArea}`}</h2>
        <div className="inner">
          {summaryType === 'string' ? (
            <h3 className="font-alfa">{summary}</h3>
          ) : (
            <div className="summary-icon">{summary}</div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </StyledFeatureSection>
  );
}

export default FeatureSection;
