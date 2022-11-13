import { ReactNode, Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';
import Spinner from '../components/Spinner';

type SuspenseBoundaryProps = {
  children: ReactNode;
};

function SuspenseBoundary({ children }: SuspenseBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary reset={reset}>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default SuspenseBoundary;
