import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import GuideSection from '@layout/components/GuideSection';
import { useRecoilValue } from 'recoil';
import { isGuideShowingAtom } from '../../../Guide/atoms';
import { sectionGuideDescriptions } from '../../../Guide/constants';

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
  ${tw`shadow-lg`}
  ${tw`border border-solid border-zinc-500`}
  
  // background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};

  // background-image: ${({ backgroundImage }) => backgroundImage && `url(${backgroundImage})`};

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
    ${tw`absolute top-[28px] left-0 w-full h-[calc(100%_-_28px)] p-4`}
    ${tw`flex flex-col justify-between`}
    ${tw`duration-700`}
    ${tw`text-right`}

    h3 {
      ${tw`text-4xl font-bold text-clip overflow-hidden`}
      ${tw`min-h-[40px]`}
      ${tw`opacity-80`}
      ${tw`duration-500`}
    }

    // .summary-icon {
    //   ${tw`flex flex-col items-end`}
    // }
  }

  &:hover {
    h2 {
      ${tw`-top-10`}
    }

    .inner {
      ${tw`top-0 h-full`};
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
  const isGuideShowing = useRecoilValue(isGuideShowingAtom);

  if (isGuideShowing) {
    return <GuideSection descriptions={sectionGuideDescriptions[gridArea]} gridArea={gridArea} />;
  }

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
            <div className="summary-icon relative flex items-center justify-end">
              <div className="absolute right-[-12px] z-0 opacity-20 blur-xl [&>svg]:h-[68px] [&>svg]:w-[68px]">
                {summary}
              </div>
              <div className="z-10">{summary}</div>
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </StyledFeatureSection>
  );
}

export default FeatureSection;
