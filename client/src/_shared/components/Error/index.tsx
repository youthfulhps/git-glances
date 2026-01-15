import { Renew } from '@carbon/icons-react';

type ErrorFallbackProps = {
  errorMessage: string | null;
  reset: () => void;
  gridArea?: string;
};

function Error({ errorMessage, reset, gridArea = '' }: ErrorFallbackProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-red-900/50 bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-950 p-4"
      style={{ gridArea }}
    >
      <p className="text-xs text-red-300/80">{errorMessage}</p>
      <Renew onClick={reset} size={12} className="m-1 cursor-pointer fill-red-300/80" />
    </div>
  );
}

export default Error;
