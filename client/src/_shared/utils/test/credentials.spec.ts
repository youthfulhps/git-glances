import { getStoredItem, setStoredItem, STORAGE_KEYS } from '@shared/utils/storage';
import { createGithubOAuthUrl, consumeOAuthState } from '@shared/utils/oauth';
import { parseAxiosError, ErrorCode, TOKEN_REQUIRED_CANCEL_MESSAGE } from '@shared/utils/errors';

describe('credential storage', () => {
  afterEach(() => {
    localStorage.clear();
    delete (globalThis as any).chrome;
  });

  it('uses localStorage when chrome.storage is unavailable (web)', async () => {
    (globalThis as any).chrome = {}; // 일반 웹 페이지의 Chrome처럼 storage 없음

    await setStoredItem(STORAGE_KEYS.GROQ_API_KEY, 'gsk_test');
    expect(localStorage.getItem(STORAGE_KEYS.GROQ_API_KEY)).toBe('gsk_test');
    expect(await getStoredItem(STORAGE_KEYS.GROQ_API_KEY)).toBe('gsk_test');

    await setStoredItem(STORAGE_KEYS.GROQ_API_KEY, '');
    expect(await getStoredItem(STORAGE_KEYS.GROQ_API_KEY)).toBe('');
  });

  it('uses chrome.storage.local in the extension and resolves empty when missing', async () => {
    const store: Record<string, string> = {};
    (globalThis as any).chrome = {
      storage: {
        local: {
          get: async (key: string) => (key in store ? { [key]: store[key] } : {}),
          set: async (items: Record<string, string>) => Object.assign(store, items),
          remove: async (key: string) => delete store[key],
        },
      },
    };

    expect(await getStoredItem(STORAGE_KEYS.GITHUB_TOKEN)).toBe('');
    await setStoredItem(STORAGE_KEYS.GITHUB_TOKEN, 'ghp_test');
    expect(await getStoredItem(STORAGE_KEYS.GITHUB_TOKEN)).toBe('ghp_test');
    expect(localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN)).toBeNull();
  });
});

describe('GitHub OAuth state', () => {
  beforeAll(() => {
    // jsdom에는 crypto.randomUUID가 없다
    Object.defineProperty(globalThis, 'crypto', { value: require('crypto').webcrypto });
  });

  it('accepts only the state issued by this browser, once', () => {
    const state = new URL(createGithubOAuthUrl('notifications')).searchParams.get('state');

    expect(consumeOAuthState('forged')).toBe(false);

    createGithubOAuthUrl('notifications');
    const issued = new URL(createGithubOAuthUrl('notifications')).searchParams.get('state');
    expect(state).not.toBe(issued);
    expect(consumeOAuthState(issued)).toBe(true);
    expect(consumeOAuthState(issued)).toBe(false);
  });
});

describe('parseAxiosError', () => {
  it('does not report a request canceled for a missing token as a network error', () => {
    expect(
      parseAxiosError({
        code: 'ERR_CANCELED',
        isAxiosError: true,
        message: TOKEN_REQUIRED_CANCEL_MESSAGE,
      }).code,
    ).toBe(ErrorCode.TOKEN_REQUIRED);
    // 토큰과 무관한 취소는 로그인 안내로 바뀌지 않는다
    expect(
      parseAxiosError({ code: 'ERR_CANCELED', isAxiosError: true, message: 'canceled' }).code,
    ).not.toBe(ErrorCode.TOKEN_REQUIRED);
    expect(parseAxiosError(new TypeError('boom')).code).toBe(ErrorCode.UNKNOWN);
    expect(parseAxiosError({ isAxiosError: true, message: 'Network Error' }).code).toBe(
      ErrorCode.NETWORK_ERROR,
    );
  });
});
