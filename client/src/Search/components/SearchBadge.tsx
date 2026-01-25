import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
// import Input from '@shared/components/Input';

import { Input } from '@shared/components/ui/input';

type SearchBadgeProps = {
  className?: string;
  searchInput: string;
  onSearchInputChange: ChangeEventHandler<HTMLInputElement>;
  onSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  target: 'github' | 'google' | 'chrome';
};

function SearchBadge({
  target,
  searchInput,
  onSearchInputChange,
  onSearchInputKeyDown,
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
        className="h-4 w-4"
      />

      <Input
        value={searchInput}
        onChange={onSearchInputChange}
        className="border-none bg-transparent text-xs"
        onKeyDown={onSearchInputKeyDown}
        placeholder={`Search on ${target}...`}
      />
    </div>
  );
}

export default SearchBadge;
