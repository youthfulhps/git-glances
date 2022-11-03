import { ReactNode } from 'react';

type FlexMainProps = {
  children: ReactNode;
};

function FlexMain({ children }: FlexMainProps) {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      {children}
    </main>
  );
}

export default FlexMain;
