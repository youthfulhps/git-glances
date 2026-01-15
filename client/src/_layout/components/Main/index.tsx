import React, { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return (
    <main className="m-auto flex w-screen flex-col overflow-x-hidden px-12 sm:h-full lg:h-screen">
      {children}
    </main>
  );
}

export default Main;
