import React from 'react';
import tw from 'tailwind-styled-components';
import { LogoGithub } from '@carbon/icons-react';
import Section from '@layout/components/Section';

// TODO: any를 사용하지 않고 TS2589 이슈 해결
const StyledLogoGithub = tw.a<any>`
  h-full
  w-full
  flex
  items-center
  justify-center
  rounded-2xl 
  bg-zinc-400
  hover:bg-zinc-100
  transition-all
`;

function Login() {
  const loginURL =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}`;

  return (
    <Section className="grid-in-login">
      <StyledLogoGithub href={loginURL}>
        <LogoGithub size={32} />
      </StyledLogoGithub>
    </Section>
  );
}

export default Login;
