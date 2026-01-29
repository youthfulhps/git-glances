import React from 'react';
import { LanguageWithRepos } from '@shared/apis/language/types';
import { formatBytes, getTotalStats } from '../../utils/languageBoardHelper';

type LanguageSummaryProps = {
  languages: LanguageWithRepos[];
};

function LanguageSummary({ languages }: LanguageSummaryProps) {
  const topLanguages = languages.slice(0, 5);
  const stats = getTotalStats(languages);

  return (
    <div className="flex w-full cursor-pointer flex-col gap-y-3">
      {/* Stacked Bar Chart */}
      <div className="flex flex-col gap-2">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-800/30">
          {topLanguages.map((language, index) => (
            <div
              key={language.name}
              className="h-full opacity-60 transition-all hover:opacity-80"
              style={{
                backgroundColor: language.color,
                width: `${language.percentage}%`,
              }}
              title={`${language.name}: ${language.percentage.toFixed(1)}%`}
            />
          ))}
          {/* Others */}
          {languages.length > 5 && (
            <div
              className="h-full bg-zinc-700 opacity-40"
              style={{
                width: `${languages.slice(5).reduce((sum, lang) => sum + lang.percentage, 0)}%`,
              }}
              title="Others"
            />
          )}
        </div>

        {/* Top Languages Legend */}
        <div className="flex gap-x-3 overflow-hidden">
          {topLanguages.slice(0, 3).map((language) => (
            <div key={language.name} className="flex min-w-0 items-center gap-1.5">
              <div
                className="h-2 w-2 flex-shrink-0 rounded-full opacity-60"
                style={{ backgroundColor: language.color }}
              />

              <span className="truncate text-xs text-zinc-400">{language.name}</span>
              <span className="flex-shrink-0 text-xs font-medium text-zinc-300">
                {language.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Stats */}
      <div className="border-t border-zinc-700/30 pt-2">
        <div className="text-[10px] text-zinc-400">
          {stats.totalLanguages} languages • {formatBytes(stats.totalSize)} total
        </div>
      </div>
    </div>
  );
}

export default LanguageSummary;
