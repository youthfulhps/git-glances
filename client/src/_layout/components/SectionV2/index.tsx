import { ReactNode } from 'react';
import classNames from 'classnames';

type SectionV2Props = {
  children: ReactNode;
  className?: string;
  gridArea?: string;
  hasBackground?: boolean;
};

function SectionV2({ children, className, gridArea, hasBackground = true }: SectionV2Props) {
  return (
    <section
      className={classNames(
        hasBackground ? 'bg-zinc-800' : '',
        `relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border
        border-zinc-600 text-zinc-200`,
        className,
      )}
      style={{ gridArea }}
    >
      <div className="flex h-full w-full">{children}</div>
    </section>
  );
}

export default SectionV2;
