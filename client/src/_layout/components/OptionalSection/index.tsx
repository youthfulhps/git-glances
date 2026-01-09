import { ReactNode } from 'react';
import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react';
import GuideSection from '@layout/components/GuideSection';
import classNames from 'classnames';
import { sectionGuideDescriptions } from '../../../Guide/constants';

type OptionalSectionProps = {
  children: ReactNode;
  className?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  gridArea?: string;
  hasOverlay: boolean;
};

function OptionalSection({
  children,
  className,
  gridArea,
  hasOverlay,
  onConfirm,
  onCancel,
}: OptionalSectionProps) {
  const isGuideShowing = false; // Removed Recoil

  if (isGuideShowing) {
    return (
      <GuideSection
        descriptions={sectionGuideDescriptions[gridArea ?? '']}
        gridArea={gridArea ?? ''}
      />
    );
  }

  return (
    <section
      className={classNames(
        'relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-solid border-zinc-500 p-4 text-zinc-100',
        className
      )}
      style={{ gridArea }}
    >
      <h2 className="text-xl font-thin drop-shadow-md">{`# ${gridArea}`}</h2>
      <div className="flex h-full w-full flex-col justify-end">{children}</div>
      <div
        className={classNames(
          hasOverlay
            ? 'absolute bottom-0 left-0 block flex h-full h-full w-full w-full flex-col items-end justify-end rounded-2xl bg-gradient-to-t from-zinc-700 p-4'
            : 'hidden'
        )}
      >
        <div className="flex animate-rising items-center">
          <button onClick={onConfirm}>
            <CheckCircleFillIcon
              size={24}
              className="mr-1 cursor-pointer fill-emerald-500 hover:opacity-80"
            />
          </button>
          <button onClick={onCancel}>
            <XCircleFillIcon size={24} className="cursor-pointer fill-red-400 hover:opacity-80" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default OptionalSection;
