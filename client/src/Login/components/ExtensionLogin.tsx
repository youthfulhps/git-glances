import { LogoGithub } from '@carbon/icons-react';
import Input from '@shared/components/Input';
import useLogin from '@shared/hooks/useLogin';

function ExtensionLogin() {
  const { inputToken, onInputTokenChange, submitInputToken, isLoggedIn, onInputTokenKeyDown } =
    useLogin();

  if (isLoggedIn) return null;

  return (
    <section className="flex h-full w-full flex-col items-center rounded-2xl border-2 border-solid border-zinc-100 p-4">
      <div className="flex w-full items-center">
        <LogoGithub size={32} color="#F5F4F5" className="mr-2" />
        <Input
          placeholder="Enter token..."
          value={inputToken}
          onChange={onInputTokenChange}
          onKeyDown={onInputTokenKeyDown}
          isArrowShowing={!!inputToken}
          onArrowClick={submitInputToken}
        />
      </div>
      <div className="ml-9 p-2 text-xs font-thin text-zinc-300">
        Please create and enter a{' '}
        <a
          href={`https://github.com/settings/tokens/new?scopes=notifications,user,repo&description=${encodeURIComponent(
            'Token for GitGlances Extension'
          )}`}
          target="_blank"
          className="text-emerald-300"
          rel="noreferrer"
        >
          token that can be fully controlled of private repositories
        </a>
        , or a{' '}
        <a
          href={`https://github.com/settings/tokens/new?scopes=notifications,public_repo,read:user,user:email,user:follow&description=${encodeURIComponent(
            'Token for GitGlances Extension'
          )}`}
          target="_blank"
          className="text-emerald-300"
          rel="noreferrer"
        >
          token that can only read public repositories.
        </a>
      </div>
    </section>
  );
}

export default ExtensionLogin;
