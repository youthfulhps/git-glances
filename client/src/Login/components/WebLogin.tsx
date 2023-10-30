import React from 'react';
import { LogoGithub } from '@carbon/icons-react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useLogin from '@shared/hooks/useLogin';

const loginURLWithFullAccess =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
  `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}` +
  '&scope=notifications,repo,user';

const loginUrlWithPublicOnly =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
  `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}` +
  '&scope=notifications,public_repo,read:user,user:email,user:follow';

const StyledLogoGithub = styled.a`
  ${tw`flex items-center justify-center`}
  ${tw`h-full w-full rounded-2xl`}
  ${tw`bg-zinc-400`}
  ${tw`hover:bg-zinc-100 transition-all`}
`;

function Login() {
  const { isLoggedIn } = useLogin();

  if (isLoggedIn) return null;

  return (
    <section className="flex h-full w-full flex-col items-center justify-center rounded-2xl text-xs">
      <StyledLogoGithub href={loginUrlWithPublicOnly} className="mb-2">
        <LogoGithub size={32} className="mr-2" />
        <span>Public repository only</span>
      </StyledLogoGithub>
      <StyledLogoGithub href={loginURLWithFullAccess}>
        <LogoGithub size={32} className="mr-2" />
        <span>Full control of private repositories</span>
      </StyledLogoGithub>
    </section>
  );
}

export default Login;
