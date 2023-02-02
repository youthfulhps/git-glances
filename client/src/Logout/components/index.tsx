import React from 'react';
import useLogin from '@shared/hooks/useLogin';
import LogoutBadge from './LogoutBadge';
import useLogout from '../hooks/useLogout';

function Logout() {
  const { submitLogout } = useLogout();
  const { isLoggedIn } = useLogin();

  return <LogoutBadge onLogout={submitLogout} isLoggedIn={isLoggedIn} />;
}

export default Logout;
