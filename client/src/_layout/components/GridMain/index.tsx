import { ReactNode } from 'react';

type GridMainProps = {
  children: ReactNode;
};

function GridMain({ children }: GridMainProps) {
  return (
    <main className="grid h-screen w-screen grid-cols-layout grid-rows-layout gap-4 p-32 grid-areas-layout">
      {children}
    </main>
  );
}

export default GridMain;
