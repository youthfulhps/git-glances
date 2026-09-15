import React from 'react';
import { LogoGithub } from '@carbon/icons-react';
import useLogin from '@shared/hooks/useLogin';
import { createGithubOAuthUrl, GITHUB_SCOPES } from '@shared/utils/oauth';

const loginOptions = [
  { type: 'public', scope: GITHUB_SCOPES.PUBLIC },
  { type: 'private', scope: GITHUB_SCOPES.PRIVATE },
];

function Login() {
  const { isLoggedIn } = useLogin();

  if (isLoggedIn) return null;

  return (
    <section className="flex h-full w-full flex-col items-center justify-center rounded-2xl text-xs [&>*:first-child]:mb-2">
      {loginOptions.map(({ type, scope }) => (
        <button
          type="button"
          key={type}
          onClick={() => window.location.assign(createGithubOAuthUrl(scope))}
          className="flex h-full w-full items-center justify-center rounded-2xl bg-zinc-400 transition-all hover:bg-zinc-100"
        >
          <LogoGithub size={32} className="mr-2" />
          <span>
            {type === 'private'
              ? 'Full control of private repositories'
              : 'Read public repositories only'}
          </span>
        </button>
      ))}
    </section>
  );
}

export default Login;
