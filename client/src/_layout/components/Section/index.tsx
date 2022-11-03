import { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

function Section({ children }: SectionProps) {
  return (
    <section className="h-full w-full rounded-2xl bg-zinc-800 shadow-md shadow-zinc-800">
      {children}
    </section>
  );
}

export default Section;
