import { ReactNode, Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';
import SectionSpinner from '../components/Spinner/SectionSpinner';

type SuspenseBoundaryProps = {
  children: ReactNode;
  gridArea?: string;
};

function SuspenseBoundary({ children, gridArea = '' }: SuspenseBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary reset={reset} gridArea={gridArea}>
      <Suspense fallback={<SectionSpinner gridArea={gridArea} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default SuspenseBoundary;
