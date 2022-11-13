import { CSSProperties } from 'react';
import { Renew } from '@carbon/icons-react';
import Section from '@layout/components/Section';

type ErrorFallbackProps = {
  errorMessage: string | null;
  reset: () => void;
  className?: string;
};

function Error({ errorMessage, reset, className = '' }: ErrorFallbackProps) {
  return (
    <Section className={className}>
      <span>{errorMessage}</span>
      <Renew onClick={reset} />
    </Section>
  );
}

export default Error;
