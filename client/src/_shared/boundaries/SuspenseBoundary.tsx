import { ReactNode, Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '@shared/atoms/common';
import ErrorBoundary from './ErrorBoundary';
import SectionSpinner from '../components/Spinner/SectionSpinner';

type SuspenseBoundaryProps = {
  children: ReactNode;
  gridArea?: string;
};

function SuspenseBoundary({ children, gridArea = '' }: SuspenseBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  const gitGlancesTokenValue = useRecoilValue(tokenAtom);

  return (
    <ErrorBoundary reset={reset} gridArea={gridArea} hasToken={!!gitGlancesTokenValue}>
      <Suspense fallback={<SectionSpinner gridArea={gridArea} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default SuspenseBoundary;
