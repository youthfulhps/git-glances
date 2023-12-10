import React from 'react';
import { DotFillIcon } from '@primer/octicons-react';

type LanguageDetailProps = {
  mostUsedLanguageLines: number;
  backgroundColor: string;
};

function LanguageDetail({ mostUsedLanguageLines, backgroundColor }: LanguageDetailProps) {
  return (
    <div className="text-xs">
      <div className="flex w-full items-center justify-end">
        <DotFillIcon fill={backgroundColor} className="mr-[1px]" />
        <span className="mr-[1px]">{mostUsedLanguageLines}</span>
        <span className="font-thin">lines</span>
      </div>
    </div>
  );
}

export default LanguageDetail;
