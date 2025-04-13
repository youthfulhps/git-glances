import React from 'react';
import SearchBadge from './SearchBadge';
import useSearch from '../hooks/useSearch';

function Search() {
  const githubSearchProps = useSearch('github');
  const googleSearchProps = useSearch('google');
  const chromeSearchProps = useSearch('chrome');

  return (
    <section className="mt-4 w-full items-center sm:static md:flex md:w-full lg:w-[810px]">
      <SearchBadge {...githubSearchProps} className="mr-4" />
      <SearchBadge {...googleSearchProps} className="mr-4" />
      {!process.env.IS_WEB ? <SearchBadge {...chromeSearchProps} className="lg:mr-4" /> : null}
    </section>
  );
}

export default Search;
