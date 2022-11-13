import { useEffect } from 'react';
import Spinner from '@shared/components/Spinner';
import FlexMain from '@layout/components/FlexMain';
import useLogin from '@shared/hooks/useLogin';

function LoginCallbackPage() {
  const { getToken } = useLogin();

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <FlexMain>
      <Spinner />
    </FlexMain>
  );
}

export default LoginCallbackPage;
