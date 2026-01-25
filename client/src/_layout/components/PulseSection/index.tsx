import React from 'react';

type PulseProps = {
  gridArea?: string;
};

function Pulse({ gridArea }: PulseProps) {
  return (
    <section
      className={`relative flex w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-solid border-zinc-500 bg-zinc-800 p-4 text-zinc-100 ${
        gridArea ? 'h-full' : 'h-full min-h-[calc(100vh-12rem)]'
      }`}
      style={{ gridArea }}
    />
  );
}

export default Pulse;
