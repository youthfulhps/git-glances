import React, { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return (
    <main className="m-auto flex w-screen flex-col justify-center px-12 sm:h-full lg:h-screen">
      {children}
    </main>
  );
}

export default Main;
