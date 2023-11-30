import React from 'react';
import Section from '@layout/components/Section';
import { CheckCircleFillIcon } from '@primer/octicons-react';

type CheckProps = {
  gridArea?: string;
};

function Check({ gridArea = '' }: CheckProps) {
  return (
    <Section gridArea={gridArea} className="flex h-full w-full items-center justify-center">
      <CheckCircleFillIcon size={40} className="animate-rising fill-emerald-500" />
    </Section>
  );
}

export default Check;
