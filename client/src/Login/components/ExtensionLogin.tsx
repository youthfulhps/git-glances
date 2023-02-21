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
    </section>
  );
}

export default ExtensionLogin;
