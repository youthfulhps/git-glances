import { Renew, WarningAlt } from '@carbon/icons-react';
import { GitGlancesError } from '@shared/utils/errors';

type ErrorFallbackProps = {
  error?: Error | GitGlancesError | string | null;
  errorMessage?: string | null;
  reset: () => void;
  gridArea?: string;
};

function Error({ error, errorMessage, reset, gridArea = '' }: ErrorFallbackProps) {
  const getMessage = () => {
    if (errorMessage) return errorMessage;
    if (typeof error === 'string') return error;
    if (error instanceof GitGlancesError) return error.getUserMessage();
    if (error instanceof Error) return error.message;
    return 'An unexpected error occurred';
  };

  const isRetryable = () => {
    if (error instanceof GitGlancesError) return error.isRetryable();
    return true;
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-900/50 bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-950 p-6"
      style={{ gridArea }}
    >
      <WarningAlt size={24} className="fill-red-400/80" />
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-red-300">{getMessage()}</p>
        {isRetryable() && (
          <p className="text-xs text-red-400/60">Click the button below to try again.</p>
        )}
      </div>
      {isRetryable() && (
        <button
          onClick={reset}
          className="flex items-center gap-1.5 rounded-md border border-red-800/50 bg-red-950/50 px-3 py-1.5 text-xs text-red-300 transition-colors hover:bg-red-900/30"
        >
          <Renew size={12} />
          Retry
        </button>
      )}
    </div>
  );
}

export default Error;
