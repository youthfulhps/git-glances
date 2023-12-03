import { ReactNode } from 'react';
import GuideSection from '@layout/components/GuideSection';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { isGuideShowingAtom } from '../../../Guide/atoms';
import { sectionGuideDescriptions } from '../../../Guide/constants';

type FeatureSectionProps = {
  children?: ReactNode;
  className?: string;
  summary: ReactNode;
  gridArea: string;
  backgroundClass?: string;
};

function FeatureSection({
  gridArea,
  children,
  className = '',
  summary,
  backgroundClass = '',
}: FeatureSectionProps) {
  const isGuideShowing = useRecoilValue(isGuideShowingAtom);
  const isIconSummary = typeof summary === 'object';

  if (isGuideShowing) {
    return <GuideSection descriptions={sectionGuideDescriptions[gridArea]} gridArea={gridArea} />;
  }

  return (
    <section
      className={classNames(
        'group relative h-full w-full overflow-hidden rounded-2xl border border-solid border-zinc-500 bg-cover bg-center bg-no-repeat text-zinc-100 shadow-lg delay-500 duration-500',
        className,
        backgroundClass
      )}
      style={{ gridArea }}
    >
      <div className="h-full w-full p-4">
        <h2 className="absolute top-4 left-4 text-xl font-thin drop-shadow-md duration-500 group-hover:-top-10">{`# ${gridArea}`}</h2>
        <div className="absolute top-[28px] left-0 flex h-[calc(100%_-_28px)] w-full flex-col justify-between p-4 text-right duration-700 group-hover:top-0 group-hover:h-full">
          {!isIconSummary ? (
            <h3 className="min-h-[40px] overflow-hidden text-clip font-alfa text-4xl font-bold opacity-80 duration-500">
              {summary}
            </h3>
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
    </section>
  );
}

export default FeatureSection;
