import React from 'react';
import { MostUsedLanguage } from '../../queries/useMostUsedLanguageQuery';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Pll from 'react-pll';
import SectionV2 from '@layout/components/SectionV2';
import { cn } from '@shared/lib/utils';

type LanguageCardProps = {
  mostUsedLanguageList: MostUsedLanguage[];
};

function LanguageCard({ mostUsedLanguageList }: LanguageCardProps) {
  const maxLines = Math.max(...mostUsedLanguageList.map((lang) => lang.lines));

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <SectionV2 gridArea="Language" hasBackground={false}>
      <div className="flex h-full w-full flex-col gap-y-0.5">
        {mostUsedLanguageList.map((language, index) => {
          const percentage = (language.lines / maxLines) * 100;
          const isTopLanguage = index === 0;
          return (
            <div key={language.name} className="flex flex-row items-center gap-2">
              <div className="relative h-3 w-3 flex-shrink-0 rounded-sm">
                {isTopLanguage && (
                  <div className="absolute left-0 top-0 h-4 w-4 flex-shrink-0 rounded-lg blur-md">
                    <Pll alt={language.name} height="32" language={language.name.toLowerCase()} />
                  </div>
                )}
                <div
                  className={cn(
                    'relative z-10 h-3 w-3 flex-shrink-0 rounded-lg opacity-80',
                    !isTopLanguage && 'grayscale-[0.9]',
                  )}
                >
                  <Pll alt={language.name} height="24" language={language.name.toLowerCase()} />
                </div>
              </div>
              <div className="flex-1">
                <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-700/50">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: isTopLanguage
                        ? 'linear-gradient(90deg, #3f3f46 0%, #a1a1aa 50%, #d4d4d8 100%)'
                        : '#52525b',
                    }}
                  />
                </div>
              </div>
              <span className="text-right text-xs font-thin text-zinc-400">
                {formatNumber(language.lines)}
              </span>
            </div>
          );
        })}
      </div>
    </SectionV2>
  );
}

export default LanguageCard;
