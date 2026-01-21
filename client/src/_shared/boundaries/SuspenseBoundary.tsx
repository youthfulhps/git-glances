import { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from '@suspensive/react';
import { useToken } from '@shared/contexts/TokenContext';
import PulseSection from '@layout/components/PulseSection';
import ErrorBoundary from './ErrorBoundary';

type SuspenseBoundaryProps = {
  children: ReactNode;
  gridArea?: string;
  mockContent?: ReactNode;
};

function SuspenseBoundary({ children, gridArea = '', mockContent }: SuspenseBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  const { token } = useToken();

  return (
    <ErrorBoundary reset={reset} gridArea={gridArea} hasToken={!!token} mockContent={mockContent}>
      <Suspense fallback={<PulseSection gridArea={gridArea} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default SuspenseBoundary;
