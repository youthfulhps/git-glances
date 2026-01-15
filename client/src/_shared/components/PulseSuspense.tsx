import React, { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from '@suspensive/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

type PulseSuspenseProps = {
  children: ReactNode;
  message?: string;
};

function PulseSuspense({ children, message = 'Loading...' }: PulseSuspenseProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      fallback={(props) => (
        <div className="mt-2 rounded-lg border border-red-900/50 bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-950 p-3">
          <p className="text-xs text-red-300/80">{props.error.message || 'An error occurred'}</p>
          <button
            onClick={() => {
              reset();
              props.reset();
            }}
            className="mt-2 text-xs text-red-400 underline hover:text-red-300"
          >
            Retry
          </button>
        </div>
      )}
    >
      <Suspense
        fallback={
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" />
            <p className="text-xs text-zinc-400">{message}</p>
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default PulseSuspense;
