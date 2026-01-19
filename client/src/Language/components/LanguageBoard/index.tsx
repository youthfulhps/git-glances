import React, { useState, useMemo } from 'react';
import { SuspenseQuery, Mutation } from '@suspensive/react-query';
import { languageListQueryOptions } from '../../queries/useLanguageListQuery';
import { languageInsightMutationOptions } from '../../mutations';
import LanguageStats from './LanguageStats';
import LanguageList from './LanguageList';
import LanguageAI from './LanguageAI';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import {
  filterLanguagesByName,
  sortLanguages,
  prepareLanguageInsightData,
} from '../../utils/languageBoardHelper';
import { SORT_OPTIONS, SortOption } from '../../constants/sortOptions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';

function LanguageBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('usage');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-200">Language Insights</div>
        <DropdownMenu open={isSortOpen} onOpenChange={setIsSortOpen}>
          <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-300">
            Sort: {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label}
            <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36 border-zinc-700 bg-zinc-900">
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setIsSortOpen(false);
                }}
                className="cursor-pointer text-xs text-zinc-300 focus:bg-zinc-800 hover:bg-zinc-800"
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SuspenseBoundary>
        <SuspenseQuery {...languageListQueryOptions}>
          {({ data: languages }) => {
            // Apply filters and sorting
            const filtered = useMemo(() => {
              let result = languages;

              // Filter by search
              if (searchQuery) {
                result = filterLanguagesByName(result, searchQuery);
              }

              // Filter by selected language
              if (selectedLanguageFilter) {
                result = result.filter((lang) => lang.name === selectedLanguageFilter);
              }

              // Sort
              return sortLanguages(result, sortBy);
            }, [languages, searchQuery, selectedLanguageFilter, sortBy]);

            return (
              <div className="flex flex-col gap-3">
                {/* Stats */}
                <LanguageStats languages={languages} />

                {/* Search */}
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="text"
                    placeholder="Search languages or repositories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800/30 py-2 pl-9 pr-3 text-xs text-zinc-300 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                  />
                </div>

                {/* Language Filter Tags */}
                {!selectedLanguageFilter && languages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {languages.slice(0, 5).map((lang) => (
                      <button
                        key={lang.name}
                        onClick={() => setSelectedLanguageFilter(lang.name)}
                        className="rounded-md border border-zinc-700 bg-zinc-800/30 px-2 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}

                {selectedLanguageFilter && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">Showing:</span>
                    <button
                      onClick={() => setSelectedLanguageFilter(null)}
                      className="rounded-md border border-zinc-700 bg-zinc-800/30 px-2 py-1 text-xs text-zinc-300 transition-colors hover:border-zinc-600"
                    >
                      {selectedLanguageFilter} ×
                    </button>
                  </div>
                )}

                {/* AI Insight */}
                <Mutation {...languageInsightMutationOptions()}>
                  {({ mutate, isPending, isError, data: aiData, error }) => (
                    <LanguageAI
                      onGenerate={() => mutate(prepareLanguageInsightData(languages))}
                      isPending={isPending}
                      isError={isError}
                      data={aiData}
                      error={error}
                    />
                  )}
                </Mutation>

                {/* Language List */}
                <LanguageList languages={filtered} />
              </div>
            );
          }}
        </SuspenseQuery>
      </SuspenseBoundary>
    </div>
  );
}

export default LanguageBoard;
