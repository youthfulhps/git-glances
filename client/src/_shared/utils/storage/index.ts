/* eslint-disable no-undef */

/**
 * 자격 증명(GitHub 토큰, Groq API 키) 저장소
 *
 * - 확장 프로그램: chrome.storage.local (웹 페이지/다른 확장에서 접근 불가)
 * - 웹: localStorage. 같은 origin의 스크립트는 읽을 수 있으므로 XSS 방어는 CSP(vercel.json)로 한다.
 *   클라이언트에서 키와 암호문을 함께 보관하는 암호화는 실질적인 보호가 되지 않아 사용하지 않는다.
 */

export const STORAGE_KEYS = {
  GITHUB_TOKEN: 'gitGlances:token',
  GROQ_API_KEY: 'gitGlances:groqApiKey',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

const hasChromeStorage = () => typeof chrome !== 'undefined' && !!chrome.storage?.local;

export const getStoredItem = async (key: StorageKey): Promise<string> => {
  if (hasChromeStorage()) {
    const result = await chrome.storage.local.get(key);
    return typeof result[key] === 'string' ? result[key] : '';
  }
  return localStorage.getItem(key) ?? '';
};

/** 빈 문자열을 넘기면 삭제한다 */
export const setStoredItem = async (key: StorageKey, value: string): Promise<void> => {
  if (hasChromeStorage()) {
    if (value) await chrome.storage.local.set({ [key]: value });
    else await chrome.storage.local.remove(key);
    return;
  }
  if (value) localStorage.setItem(key, value);
  else localStorage.removeItem(key);
};
