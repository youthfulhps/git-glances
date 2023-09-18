import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import Input from '@shared/components/Input';
import tw from 'twin.macro';
import styled from 'styled-components';

type SearchBadgeProps = {
  className?: string;
  searchInput: string;
  onSearchInputChange: ChangeEventHandler<HTMLInputElement>;
  onSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onSubmitSearch: (searchInput: string) => void;
  target: 'github' | 'google';
};

const StyledSearchBadge = styled.div<{ hasSearchInput: boolean }>`
  img {
    ${({ hasSearchInput }) => hasSearchInput && tw`mr-2`};
  }
`;

function SearchBadge({
  className = '',
  target,
  searchInput,
  onSearchInputChange,
  onSearchInputKeyDown,
  onSubmitSearch,
}: SearchBadgeProps) {
  return (
    <StyledSearchBadge
      hasSearchInput={!!searchInput}
      className={`flex w-[48px] items-center overflow-hidden rounded-2xl bg-zinc-800 p-2 opacity-80 duration-500 scrollbar-track-transparent hover:w-[236px] hover:opacity-100 ${className}`}
    >
      <img src={`icons/${target}.svg`} alt={`${target} logo for searching`} className="h-8 w-8" />
      <Input
        className="ml-2"
        value={searchInput}
        onChange={onSearchInputChange}
        onKeyDown={onSearchInputKeyDown}
        isArrowShowing={!!searchInput}
        onArrowClick={() => onSubmitSearch(searchInput)}
        placeholder={`Search on ${target}...`}
      />
    </StyledSearchBadge>
  );
}

export default SearchBadge;
