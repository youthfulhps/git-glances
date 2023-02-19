/* eslint-disable react-hooks/rules-of-hooks */
import cookie from 'cookiejs';
import qs from 'qs';
import { getAuthToken } from '@shared/apis/auth';
import { hasAuthCookie } from '@shared/utils/cookie';
import useRouterHooks from '@shared/libs/useRouterHooks';

const { useLocation, useNavigate } = await useRouterHooks();

const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getToken = async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    try {
      const { data: accessToken } = await getAuthToken(code as string);

      if (accessToken) {
        cookie.set('gitin:token', accessToken);
      }

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getToken,
    isLoggedIn: hasAuthCookie(),
  };
};

export default useLogin;
