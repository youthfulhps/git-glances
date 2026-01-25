import { ReactNode } from 'react';

type GridProps = {
  children: ReactNode;
};

function Grid({ children }: GridProps) {
  return <div className={'grid-template'}>{children}</div>;
}

export default Grid;
