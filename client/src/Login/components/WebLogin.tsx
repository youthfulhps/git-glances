import React from 'react';
import { LogoGithub } from '@carbon/icons-react';
import useLogin from '@shared/hooks/useLogin';

const loginUrls = [
  {
    type: 'public',
    url:
      `https://github.com/login/oauth/authorize` +
      `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
      `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}` +
      '&scope=notifications,public_repo,read:user,user:email,user:follow',
  },
  {
    type: 'private',
    url:
      `https://github.com/login/oauth/authorize` +
      `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
      `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}` +
      '&scope=notifications,repo,user',
  },
];

function Login() {
  const { isLoggedIn } = useLogin();

  if (isLoggedIn) return null;

  return (
    <section className="flex h-full w-full flex-col items-center justify-center rounded-2xl text-xs [&>*:first-child]:mb-2">
      {loginUrls.map(({ type, url }) => (
        <a
          key={type}
          href={url}
          className="flex h-full w-full items-center justify-center rounded-2xl bg-zinc-400 transition-all hover:bg-zinc-100"
        >
          <LogoGithub size={32} className="mr-2" />
          <span>
            {type === 'private'
              ? 'Full control of private repositories'
              : 'Read public repositories only'}
          </span>
        </a>
      ))}
    </section>
  );
}

export default Login;
