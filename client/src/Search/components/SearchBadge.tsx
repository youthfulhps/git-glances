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
  className = '',
  target,
  searchInput,
  onSearchInputChange,
  onSearchInputKeyDown,
  onSubmitSearch,
}: SearchBadgeProps) {
  return (
    <div
      className={`flex w-full items-center overflow-hidden rounded-2xl border border-solid border-zinc-500 p-2 opacity-80 hover:opacity-100 ${className}`}
    >
      <img
        src={target === 'chrome' ? 'icons/chrome.png' : `icons/${target}.svg`}
        alt={`${target} logo for searching`}
        className="mr-2 h-8 w-8"
      />
      <Input
        className="ml-2"
        value={searchInput}
        onChange={onSearchInputChange}
        onKeyDown={onSearchInputKeyDown}
        isArrowShowing={!!searchInput}
        onArrowClick={() => onSubmitSearch(searchInput)}
        placeholder={`Search on ${target}...`}
      />
    </div>
  );
}

export default SearchBadge;
