import React from 'react';

function Login() {
  const loginURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}`;
  return (
    <a className="text-zinc-100" href={loginURL}>
      로그인 합니다.
    </a>
  );
}

export default Login;
