import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

function LoginCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authURI = `${process.env.AUTH_BASE_URL}/authenticate`;

    const getToken = async () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      try {
        const response = await fetch(`${authURI}?code=${code}`);
        const data = await response.json();

        localStorage.setItem('token', data);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, [navigate, location]);

  return <div>콜백 페이지</div>;
}

export default LoginCallbackPage;
