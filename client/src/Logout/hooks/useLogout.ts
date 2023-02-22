import { useResetRecoilState } from 'recoil';
import { tokenAtom } from '@shared/atoms/common';

const useLogout = () => {
  const resetGitGlancesTokenState = useResetRecoilState(tokenAtom);

  const submitLogout = async () => {
    resetGitGlancesTokenState();
    window.location.reload();
  };

  return { submitLogout };
};

export default useLogout;
