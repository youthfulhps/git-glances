import { useLocation, useNavigate } from 'react-router-dom';
import cookie from 'cookiejs';
import qs from 'qs';
import { getAuthToken } from '@shared/apis/auth';
import { hasAuthCookie } from '@shared/utils/cookie';
import { useEffect, useState } from 'react';

const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(hasAuthCookie());
  }, [setIsLoggedIn, hasAuthCookie]);

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
    isLoggedIn,
  };
};

export default useLogin;
