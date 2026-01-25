import { ReactNode } from 'react';
import classNames from 'classnames';

type SectionProps = {
  children: ReactNode;
  className?: string;
  gridArea?: string;
};

function Section({ children, className, gridArea }: SectionProps) {
  return (
    <section
      className={classNames(
        'relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-[linear-gradient(135deg,rgba(35,39,47,0.7),rgba(18,18,19,0.8))] p-4 text-zinc-100',
        className
      )}
      style={{ gridArea }}
    >
      <h2 className="absolute left-4 top-4 text-xl font-thin drop-shadow-md">{`# ${gridArea}`}</h2>
      <div className="flex h-full w-full flex-col items-center justify-center">{children}</div>
    </section>
  );
}

export default Section;
