import React, { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return (
    <main className="m-auto flex h-screen w-screen flex-col justify-center p-32">{children}</main>
  );
}

export default Main;
