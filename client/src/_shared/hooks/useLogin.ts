/* eslint-disable react-hooks/rules-of-hooks */
import qs from 'qs';
import { getAuthToken } from '@shared/apis/auth';
import useRouterHooks from '@shared/libs/useRouterHooks';
import { useToken } from '@shared/contexts/TokenContext';
import { consumeOAuthState } from '@shared/utils/oauth';
import useInput from '@shared/hooks/useInput';

const { useLocation, useNavigate } = await useRouterHooks();

const useLogin = () => {
  const { token, setToken } = useToken();

  const submitInputToken = () => {
    setToken(inputToken);
  };

  const {
    value: inputToken,
    onChange: onInputTokenChange,
    onKeyDown: onInputTokenKeyDown,
  } = useInput('', submitInputToken);

  const location = useLocation();
  const navigate = useNavigate();

  const getToken = async () => {
    const { code, state } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    // 이 브라우저에서 시작한 로그인이 아니면 code를 교환하지 않는다
    if (!consumeOAuthState(state) || typeof code !== 'string') {
      navigate('/', { replace: true });
      return;
    }

    try {
      const { data: accessToken } = await getAuthToken(code);

      if (accessToken) {
        await setToken(accessToken);
      }

      // code가 브라우저 히스토리에 남지 않도록 교체
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
      // state는 이미 소모됐으므로 콜백 페이지에 머물지 않고 홈에서 다시 로그인하게 한다
      navigate('/', { replace: true });
    }
  };

  return {
    inputToken,
    onInputTokenChange,
    submitInputToken,
    onInputTokenKeyDown,
    getToken,
    isLoggedIn: !!token,
  };
};

export default useLogin;
