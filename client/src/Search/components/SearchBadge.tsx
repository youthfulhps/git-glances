import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import Input from '@shared/components/Input';

type SearchBadgeProps = {
  className?: string;
  searchInput: string;
  onSearchInputChange: ChangeEventHandler<HTMLInputElement>;
  onSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onSubmitSearch: (searchInput: string) => void;
  target: 'github' | 'google' | 'chrome';
};

function SearchBadge({
  target,
  searchInput,
  onSearchInputChange,
  onSearchInputKeyDown,
  onSubmitSearch,
}: SearchBadgeProps) {
  return (
    <div
      className={
        'flex h-full w-full flex-row items-center justify-center gap-2 px-2 opacity-80 hover:opacity-100'
      }
    >
      <img
        src={target === 'chrome' ? 'icons/chrome.png' : `icons/${target}.svg`}
        alt={`${target} logo for searching`}
        className="h-8 w-8"
      />

      <Input
        value={searchInput}
        onChange={onSearchInputChange}
        className="bg-transparent"
        onKeyDown={onSearchInputKeyDown}
        isArrowShowing={!!searchInput}
        onArrowClick={() => onSubmitSearch(searchInput)}
        placeholder={`Search on ${target}...`}
      />
    </div>
  );
}

export default SearchBadge;
