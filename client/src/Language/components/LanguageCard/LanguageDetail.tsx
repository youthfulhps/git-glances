import React from 'react';

type LanguageDetailProps = {
  mostUsedLanguageLines: number;
};

function LanguageDetail({ mostUsedLanguageLines }: LanguageDetailProps) {
  return (
    <div className="text-xs">
      <span>{mostUsedLanguageLines}</span>
      <span className="font-thin"> lines</span>
    </div>
  );
}

export default LanguageDetail;
