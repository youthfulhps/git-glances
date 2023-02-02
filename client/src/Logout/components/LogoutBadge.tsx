import React from 'react';
import { SignOutIcon } from '@primer/octicons-react';

type LogoutBadgeProps = {
  onLogout: () => void;
  isLoggedIn: boolean;
};

function LogoutBadge({ onLogout, isLoggedIn }: LogoutBadgeProps) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <button
      onClick={onLogout}
      className="group flex h-[59px] items-center rounded-2xl bg-zinc-800 p-2"
    >
      <SignOutIcon size={32} className="fill-zinc-400 group-hover:fill-zinc-100" />
    </button>
  );
}

export default LogoutBadge;
