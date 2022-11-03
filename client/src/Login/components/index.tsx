import React from 'react';
import { LogoGithub } from '@carbon/icons-react';
import Section from '@layout/components/Section';

function Login() {
  const loginURL =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}`;

  return (
    <Section>
      <a className="text-zinc-100" href={loginURL}>
        <LogoGithub />
      </a>
    </Section>
  );
}

export default Login;
