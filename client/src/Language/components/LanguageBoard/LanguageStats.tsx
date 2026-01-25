import React from 'react';
import { LanguageWithRepos } from '@shared/apis/language/types';
import { getTotalStats, formatBytes } from '../../utils/languageBoardHelper';

type LanguageStatsProps = {
  languages: LanguageWithRepos[];
};

function LanguageStats({ languages }: LanguageStatsProps) {
  const stats = getTotalStats(languages);
  const topLanguages = languages.slice(0, 4);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
      {/* Total Stats */}
      <div className="text-xs text-zinc-400">
        Total: {formatBytes(stats.totalSize)} • {stats.totalLanguages} languages •{' '}
        {stats.totalRepos} repos
      </div>

      {/* Top Languages Breakdown */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {topLanguages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-full opacity-60"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-zinc-400">{lang.name}</span>
            <span className="font-medium text-zinc-300">{formatBytes(lang.totalSize)}</span>
          </div>
        ))}
        {languages.length > 4 && (
          <span className="text-zinc-500">
            +{languages.length - 4} more
          </span>
        )}
      </div>
    </div>
  );
}

export default LanguageStats;
