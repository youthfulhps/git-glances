import { getLanguageBackgroundColor } from '../utils/languageStyleHelper';

describe('languageStyleHelper는 언어에 대한 스타일을 반환한다.', () => {
  it('getLanguageBackgroundColor는 가장 많이 사용한 언어의 대표 색상을 반환한다.', () => {
    expect(getLanguageBackgroundColor('JavaScript')).toBe('#f1e05a');
    expect(getLanguageBackgroundColor('Java')).toBe('#b07219');
    expect(getLanguageBackgroundColor('Python')).toBe('#3572A5');
    expect(getLanguageBackgroundColor('')).toBe('#000000');
  });
});
