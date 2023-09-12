import React from 'react';
import Section from '@layout/components/Section';

type GuideSectionProps = {
  descriptions: string[];
  gridArea: string;
};

function GuideSection({ descriptions, gridArea }: GuideSectionProps) {
  return (
    <Section gridArea={gridArea}>
      <div className="flex h-full w-full flex-col justify-end">
        {descriptions.map((description) => (
          <p key={description} className="block w-full text-left text-xs text-zinc-400">
            {description}
          </p>
        ))}
      </div>
    </Section>
  );
}

export default GuideSection;
