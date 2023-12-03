import { ReactNode } from 'react';
import useLogin from '@shared/hooks/useLogin';

type GridProps = {
  children: ReactNode;
};

function Grid({ children }: GridProps) {
  const { isLoggedIn } = useLogin();
  return (
    <div className={isLoggedIn ? 'grid-template__login' : 'grid-template__logout'}>{children}</div>
  );
}

export default Grid;
