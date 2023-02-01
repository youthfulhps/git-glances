import React from 'react';
import SearchBadge from './SearchBadge';
import useSearch from '../hooks/useSearch';

function Search() {
  const githubSearchProps = useSearch('github');
  const googleSearchProps = useSearch('google');

  return (
    <section className="flex items-center">
      <SearchBadge {...githubSearchProps} className="mr-2" />
      <SearchBadge {...googleSearchProps} />
    </section>
  );
}

export default Search;
