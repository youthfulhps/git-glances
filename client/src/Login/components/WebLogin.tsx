import React from 'react';
import { LogoGithub } from '@carbon/icons-react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useLogin from '@shared/hooks/useLogin';

const loginURL =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
  `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}` +
  '&scope=repo,user';

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
    <section className="flex h-full w-full flex-col items-center justify-center rounded-2xl">
      <StyledLogoGithub href={loginURL}>
        <LogoGithub size={32} />
      </StyledLogoGithub>
    </section>
  );
}

export default Login;
