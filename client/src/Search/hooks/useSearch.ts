import useInput from '@shared/hooks/useInput';
/* global chrome */


const useSearch = (target: 'github' | 'google' | 'chrome') => {
  const submitSearch = (searchInput: string) => {
    window.open(`https://${target}.com/search?q=${searchInput}`, '_blank');
  };

  const chromeSubmitSearch = (searchInput: string) => {
    chrome.search.query({text: searchInput, disposition: 'NEW_TAB'}, () => {});
  }

  const onSearch = (searchInput: string) => {
    if(target === 'chrome') {
      chromeSubmitSearch(searchInput)
      return;
    }

    submitSearch(searchInput);
  }


  const { value, onChange, onKeyDown } = useInput('', () => onSearch(value));

  return {
    target,
    searchInput: value,
    onSearchInputChange: onChange,
    onSearchInputKeyDown: onKeyDown,
    onSubmitSearch: submitSearch,
  };
};

export default useSearch;
