/* eslint-disable react-hooks/rules-of-hooks */
import qs from 'qs';
import { getAuthToken } from '@shared/apis/auth';
import useRouterHooks from '@shared/libs/useRouterHooks';
import { useToken } from '@shared/contexts/TokenContext';
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
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    try {
      const { data: accessToken } = await getAuthToken(code as string);

      if (accessToken) {
        setToken(accessToken);
      }

      navigate('/');
    } catch (error) {
      console.log(error);
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
