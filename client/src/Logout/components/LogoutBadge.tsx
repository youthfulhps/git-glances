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
      className="group flex h-[58px] w-[40px] items-center overflow-hidden rounded-2xl bg-zinc-800 p-2 duration-500 hover:w-[102px]"
    >
      <SignOutIcon size={20} className="ml-[2px] mr-3 fill-zinc-400 group-hover:fill-zinc-100" />
      <span className="text-base font-thin text-zinc-400 drop-shadow-md">Logout</span>
    </button>
  );
}

export default LogoutBadge;
