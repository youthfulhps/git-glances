import React, { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return (
    <main className="m-auto flex w-screen flex-col justify-center p-6 sm:h-full md:p-16 lg:h-screen lg:p-16">
      {children}
    </main>
  );
}

export default Main;
