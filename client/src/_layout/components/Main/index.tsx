import GradualBlur from '@shared/components/GradualBlur';
import React, { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return (
    <main className="relative">
      <GradualBlur
        position="top"
        height="4rem"
        strength={5}
        curve="bezier"
        exponential={true}
        opacity={0.5}
      />

      <div className="m-auto flex w-screen flex-col overflow-x-hidden px-12 sm:h-full lg:h-screen">
        {children}
      </div>

      <GradualBlur
        position="bottom"
        height="4rem"
        strength={5}
        curve="bezier"
        exponential={true}
        opacity={0.5}
      />
    </main>
  );
}

export default Main;
