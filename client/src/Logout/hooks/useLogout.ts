import { removeAuthCookie } from '@shared/utils/cookie';

const useLogout = () => {
  const submitLogout = async () => {
    removeAuthCookie();
    window.location.reload();
  };

  return { submitLogout };
};

export default useLogout;
