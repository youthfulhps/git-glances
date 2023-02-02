import React, { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return (
    <main className="m-auto flex w-screen flex-col justify-center p-16 sm:h-full lg:h-screen lg:p-32">
      {children}
    </main>
  );
}

export default Main;
