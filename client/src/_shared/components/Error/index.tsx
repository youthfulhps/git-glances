import { Renew } from '@carbon/icons-react';
import Section from '@layout/components/Section';

type ErrorFallbackProps = {
  errorMessage: string | null;
  reset: () => void;
  gridArea?: string;
};

function Error({ errorMessage, reset, gridArea = '' }: ErrorFallbackProps) {
  return (
    <Section
      gridArea={gridArea}
      className="flex h-full w-full flex-col items-center justify-center text-zinc-300"
    >
      <span>{errorMessage}</span>
      <Renew onClick={reset} size={24} className="m-4 cursor-pointer" />
    </Section>
  );
}

export default Error;
