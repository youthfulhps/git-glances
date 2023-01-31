import React from 'react';
import Section from '@layout/components/Section';
import Spinner from './Spinner';

type SpinnerProps = {
  gridArea?: string;
};

function SectionSpinner({ gridArea = '' }: SpinnerProps) {
  return (
    <Section gridArea={gridArea} className="flex h-full w-full items-center justify-center">
      <Spinner />
    </Section>
  );
}

export default SectionSpinner;
