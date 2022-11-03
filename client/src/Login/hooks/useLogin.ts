import { useLocation, useNavigate } from 'react-router-dom';
import cookie from 'cookiejs';
import qs from 'qs';
import { getAuthToken } from '@shared/apis/auth';

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
  };
};

export default useLogin;
