import { isValidURL, getURLWithProtocol } from '@shared/utils/url/index';

describe('url 유틸함수는 URL에 대한 순수한 결과값을 반환한다.', () => {
  it('isValidURL는 문자열이 유효한 URL 여부를 반환한다.', () => {
    expect(isValidURL('https://gitin.vercel.app')).toBe(true);
    expect(isValidURL('http://gitin.vercel.app')).toBe(true);
    expect(isValidURL('gitin.vercel.app')).toBe(true);
    expect(isValidURL('gitinvercelapp')).toBe(false);
    expect(isValidURL('')).toBe(false);
  });

  it('getURLWithProtocol은 유효한 URL에 대해 프로토콜을 부여한 URL을 반환한다.', () => {
    expect(getURLWithProtocol('https://gitin.vercel.app')).toBe(
      'https://gitin.vercel.app'
    );
    expect(getURLWithProtocol('http://gitin.vercel.app')).toBe(
      'http://gitin.vercel.app'
    );
    expect(getURLWithProtocol('gitin.vercel.app')).toBe(
      'https://gitin.vercel.app'
    );
    expect(getURLWithProtocol('gitinvercelapp')).toBe('https://gitinvercelapp');
    expect(getURLWithProtocol('')).toBe('https://');
  });
});
