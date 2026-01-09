import { ReactNode } from 'react';
import classNames from 'classnames';

type SectionV2Props = {
  children: ReactNode;
  className?: string;
  gridArea?: string;
};

function SectionV2({ children, className, gridArea }: SectionV2Props) {
  return (
    <section
      className={classNames(
        `relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-600 bg-zinc-800
        text-zinc-200`,
        className,
      )}
      style={{ gridArea }}
    >
      <div className="flex h-full w-full">{children}</div>
    </section>
  );
}

export default SectionV2;
