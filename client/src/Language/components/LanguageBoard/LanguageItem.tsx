import React from 'react';
import { LanguageWithRepos } from '@shared/apis/language/types';
import { formatBytes } from '../../utils/languageBoardHelper';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@shared/lib/utils';

type LanguageItemProps = {
  language: LanguageWithRepos;
  isExpanded: boolean;
  onToggle: () => void;
};

function LanguageItem({ language, isExpanded, onToggle }: LanguageItemProps) {
  const topRepos = language.repositories.slice(0, isExpanded ? undefined : 3);
  const hasMore = language.repositories.length > 3 && !isExpanded;

  return (
    <div className="animate-fadeInUp rounded-lg border border-zinc-700 bg-zinc-800/30">
      {/* Language Header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 p-3 text-left transition-colors hover:bg-zinc-800/50"
      >
        <ChevronRight
          size={14}
          className={cn(
            'flex-shrink-0 text-zinc-500 transition-transform',
            isExpanded && 'rotate-90',
          )}
        />

        <div
          className="h-2 w-2 flex-shrink-0 rounded-full opacity-60"
          style={{ backgroundColor: language.color }}
        />

        <span className="flex-1 text-xs font-medium text-zinc-200">{language.name}</span>
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span>{formatBytes(language.totalSize)}</span>
          <span className="text-zinc-600">•</span>
          <span>{language.percentage.toFixed(1)}%</span>
          <span className="text-zinc-600">•</span>
          <span>{language.repoCount} repos</span>
        </div>
      </button>

      {/* Repository List */}
      {isExpanded && (
        <div className="border-t border-zinc-700/50 p-3 pt-2">
          <div className="flex flex-col gap-1.5">
            {topRepos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-zinc-700/30"
              >
                <div className="flex flex-1 items-center gap-2">
                  <span className="text-xs text-zinc-300 group-hover:text-zinc-200">
                    {repo.name}
                  </span>
                  <ExternalLink size={10} className="text-zinc-600 group-hover:text-zinc-500" />
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>{formatBytes(repo.size)}</span>
                  <span className="text-zinc-700">•</span>
                  <span>{repo.percentage.toFixed(0)}%</span>
                </div>
              </a>
            ))}
          </div>
          {hasMore && (
            <button onClick={onToggle} className="mt-2 text-xs text-zinc-500 hover:text-zinc-400">
              Show {language.repositories.length - 3} more...
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default LanguageItem;
