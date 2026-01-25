import { getLanguageBackgroundColor } from '../utils/languageStyleHelper';

describe('languageStyleHelper', () => {
  it('getLanguageBackgroundColor returns representative color for most used language', () => {
    expect(getLanguageBackgroundColor('JavaScript')).toBe('#f1e05a');
    expect(getLanguageBackgroundColor('Java')).toBe('#b07219');
    expect(getLanguageBackgroundColor('Python')).toBe('#3572A5');
    expect(getLanguageBackgroundColor('')).toBe('#000000');
  });
});
