import { useToken } from '@shared/contexts/TokenContext';

const useLogout = () => {
  const { setToken } = useToken();

  const submitLogout = async () => {
    setToken('');
    window.location.reload();
  };

  return { submitLogout };
};

export default useLogout;
