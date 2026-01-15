import React, { useState } from 'react';

import { useBoard } from '@shared/contexts/BoardContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
import { languageDetailList } from '../../../Language/constants/languageDetailList';
import { Input } from '@shared/components/ui/input';
import TrendsInfiniteQuery from '../TrendsInfiniteQuery';
import { TrendsRepository } from '@shared/apis/repo';
import TrendsList from './TrendsList';

const LANGUAGES = Object.keys(languageDetailList).sort();

function TrendsBoard() {
  const { selectedLanguage, setSelectedLanguage } = useBoard();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredLanguages = LANGUAGES.filter((language) =>
    language.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-200">Trending Repositories</div>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-300">
            {selectedLanguage}
            <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 border-zinc-700 bg-zinc-900">
            <div
              className="sticky top-0 z-10 bg-zinc-900 p-2"
              onKeyDown={(e) => e.stopPropagation()}
            >
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="h-9 border-zinc-700 bg-zinc-800 pl-8 text-xs text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language) => (
                  <DropdownMenuItem
                    key={language}
                    onClick={() => {
                      setSelectedLanguage(language);
                      setSearchQuery('');
                      setIsOpen(false);
                    }}
                    className="cursor-pointer text-xs text-zinc-300 focus:bg-zinc-800 hover:bg-zinc-800"
                  >
                    {language}
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-2 text-center text-xs text-zinc-500">No languages found</div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TrendsInfiniteQuery language={selectedLanguage}>
        {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
          const pages = (data as { pages?: Array<{ repositories: TrendsRepository[] }> })?.pages;

          return (
            <TrendsList
              pages={pages ?? []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          );
        }}
      </TrendsInfiniteQuery>
    </div>
  );
}

export default TrendsBoard;
