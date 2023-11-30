import { ReactNode, Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '@shared/atoms/common';
import PulseSection from '@layout/components/PulseSection';
import ErrorBoundary from './ErrorBoundary';

type SuspenseBoundaryProps = {
  children: ReactNode;
  gridArea?: string;
};

function SuspenseBoundary({ children, gridArea = '' }: SuspenseBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  const gitGlancesTokenValue = useRecoilValue(tokenAtom);

  return (
    <ErrorBoundary reset={reset} gridArea={gridArea} hasToken={!!gitGlancesTokenValue}>
      <Suspense fallback={<PulseSection gridArea={gridArea} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default SuspenseBoundary;
