const OAUTH_STATE_KEY = 'gitGlances:oauthState';

/**
 * GitHub OAuth 인가 URL을 만든다.
 * state는 로그인 CSRF(공격자의 code로 로그인시키기)를 막기 위해 매번 새로 발급해 콜백에서 검증한다.
 */
export const createGithubOAuthUrl = (scope: string) => {
  const state = crypto.randomUUID();
  sessionStorage.setItem(OAUTH_STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_OAUTH_CLIENT_ID ?? '',
    redirect_uri: process.env.GITHUB_OAUTH_REDIRECT_URL ?? '',
    scope,
    state,
  });

  return `https://github.com/login/oauth/authorize?${params}`;
};

/** 콜백으로 돌아온 state가 발급한 값과 같은지 확인한다. 일회용이라 확인 후 폐기한다. */
export const consumeOAuthState = (state: unknown) => {
  const expected = sessionStorage.getItem(OAUTH_STATE_KEY);
  sessionStorage.removeItem(OAUTH_STATE_KEY);
  return !!expected && state === expected;
};
