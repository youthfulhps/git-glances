const OAUTH_STATE_KEY = 'gitGlances:oauthState';

/**
 * 앱은 GitHub API를 조회만 하므로 최소 권한만 요청한다.
 * - 공개 데이터(공개 저장소, 이벤트, 커밋, 검색)는 scope 없이 조회 가능
 * - notifications: /notifications 조회
 * - read:user: 사용자 프로필(비공개 필드 포함) 조회. `user`와 달리 쓰기 권한 없음
 * - repo: 비공개 저장소 조회. classic 토큰에는 읽기 전용 비공개 저장소 scope가 없어 불가피
 */
export const GITHUB_SCOPES = {
  PUBLIC: 'notifications,read:user',
  PRIVATE: 'notifications,repo,read:user',
} as const;

/** 필요한 scope가 미리 체크된 classic 토큰 발급 페이지 URL */
export const createGithubTokenUrl = (scope: string) =>
  `https://github.com/settings/tokens/new?scopes=${scope}&description=${encodeURIComponent(
    'Token for GitGlances Extension',
  )}`;

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
