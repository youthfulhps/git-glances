import React from 'react';
import SearchBadge from './SearchBadge';
import useSearch from '../hooks/useSearch';

function Search() {
  const githubSearchProps = useSearch('github');
  const googleSearchProps = useSearch('google');

  return (
    <section className="mt-4 flex w-full items-center md:w-full lg:w-[540px]">
      <SearchBadge {...githubSearchProps} className="mr-4 w-full" />
      <SearchBadge {...googleSearchProps} className="w-full lg:mr-4" />
    </section>
  );
}

export default Search;
