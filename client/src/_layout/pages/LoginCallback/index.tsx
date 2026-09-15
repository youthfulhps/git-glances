import { useEffect } from 'react';
import Spinner from '@shared/components/Spinner/Spinner';
import FlexMain from '@layout/components/FlexMain';
import useLogin from '@shared/hooks/useLogin';

function LoginCallbackPage() {
  const { getToken } = useLogin();

  // getToken은 렌더마다 새로 만들어지므로 마운트 시 한 번만 실행 (OAuth code와 state는 일회용)
  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlexMain>
      <Spinner />
    </FlexMain>
  );
}

export default LoginCallbackPage;
