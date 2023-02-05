import useInput from '@shared/hooks/useInput';

const useSearch = (target: 'github' | 'google') => {
  const submitSearch = (searchInput: string) => {
    window.open(`https://${target}.com/search?q=${searchInput}`, '_blank');
  };

  const { value, onChange, onKeyDown } = useInput('', () => submitSearch(value));

  return {
    target,
    searchInput: value,
    onSearchInputChange: onChange,
    onSearchInputKeyDown: onKeyDown,
    onSubmitSearch: submitSearch,
  };
};

export default useSearch;
