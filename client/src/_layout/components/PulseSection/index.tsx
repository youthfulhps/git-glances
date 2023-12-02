import React from 'react';

type PulseProps = {
  gridArea?: string;
};

function Pulse({ gridArea }: PulseProps) {
  return (
    <section
      className="relative flex h-full w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-solid border-zinc-500 bg-zinc-800 p-4 text-zinc-100"
      style={{ gridArea }}
    >
      <h2 className="absolute top-4 left-4 text-xl font-thin drop-shadow-md">{`# ${gridArea}`}</h2>
    </section>
  );
}

export default Pulse;
