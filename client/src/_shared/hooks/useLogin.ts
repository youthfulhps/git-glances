/* eslint-disable react-hooks/rules-of-hooks */
import qs from 'qs';
import { getAuthToken } from '@shared/apis/auth';
import useRouterHooks from '@shared/libs/useRouterHooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenAtom } from '@shared/atoms/common';
import useInput from '@shared/hooks/useInput';

const { useLocation, useNavigate } = await useRouterHooks();

const useLogin = () => {
  const gitGlancesTokenValue = useRecoilValue(tokenAtom);
  const setGitGlancesTokenState = useSetRecoilState(tokenAtom);

  const submitInputToken = () => {
    setGitGlancesTokenState(inputToken);
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
        setGitGlancesTokenState(accessToken);
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
    isLoggedIn: !!gitGlancesTokenValue,
  };
};

export default useLogin;
