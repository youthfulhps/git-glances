import { ReactNode } from 'react';
import GuideSection from '@layout/components/GuideSection';
import classNames from 'classnames';
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
  const isGuideShowing = false; // Removed Recoil
  const isIconSummary = typeof summary === 'object';

  if (isGuideShowing) {
    return <GuideSection descriptions={sectionGuideDescriptions[gridArea]} gridArea={gridArea} />;
  }

  return (
    <section
      className={classNames(
        `group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-4 text-zinc-100 shadow-lg
        delay-500 duration-500`,
        className,
        backgroundClass || 'bg-[linear-gradient(135deg,rgba(25,28,35,0.85),rgba(18,18,19,0.8))]',
      )}
      style={{
        gridArea,
        border: '2px solid rgba(25,28,35,0.6)',
      }}
    >
      <div className="h-full w-full p-4">
        <h2 className="absolute left-4 top-4 text-xl font-thin drop-shadow-md duration-500 group-hover:-top-10">{`# ${gridArea}`}</h2>
        <div className="absolute left-0 top-[28px] flex h-[calc(100%_-_28px)] w-full flex-col justify-between p-4 text-right duration-700 group-hover:top-0 group-hover:h-full">
          {!isIconSummary ? (
            <h3 className="min-h-10 overflow-hidden text-clip font-alfa text-4xl font-bold opacity-80 duration-500">
              {summary}
            </h3>
          ) : (
            <div className="summary-icon relative flex items-center justify-end">
              <div className="absolute -right-3 z-0 opacity-10 blur-lg [&>svg]:h-[68px] [&>svg]:w-[68px]">
                {summary}
              </div>
              <div className="z - 10;">{summary}</div>
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
