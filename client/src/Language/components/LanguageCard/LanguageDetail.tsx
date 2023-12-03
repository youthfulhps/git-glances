import React from 'react';

type LanguageDetailProps = {
  mostUsedLanguageLines: number;
  backgroundColor: string;
};

function LanguageDetail({ mostUsedLanguageLines, backgroundColor }: LanguageDetailProps) {
  return (
    <div className="text-xs">
      <span>{mostUsedLanguageLines}</span>
      <span className="font-thin"> lines</span>
      <div className="relative z-10 h-[2px] w-full rounded-2xl" style={{ backgroundColor }}>
        <div
          className="absolute top-[-6px] left-[-6px] z-0 h-3 w-[calc(100%_+_12px)] rounded-2xl opacity-30 blur-lg"
          style={{ backgroundColor }}
        />
      </div>
    </div>
  );
}

export default LanguageDetail;
