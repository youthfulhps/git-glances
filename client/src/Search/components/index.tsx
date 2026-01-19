import React from 'react';
import SearchBadge from './SearchBadge';
import useSearch from '../hooks/useSearch';
import SectionV2 from '@layout/components/SectionV2';

function Search() {
  const githubSearchProps = useSearch('github');

  return (
    <SectionV2 gridArea="Search" hasBackground={false} hasArrow={false}>
      <SearchBadge {...githubSearchProps} />
    </SectionV2>
  );
}

export default Search;
