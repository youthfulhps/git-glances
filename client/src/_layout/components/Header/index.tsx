import React from 'react';
import Search from '../../../Search/components';
import Logout from '../../../Logout/components';

function Header() {
  return (
    <header className="mb-2 flex h-[60px] w-full items-center justify-between rounded-2xl text-zinc-100">
      <Search />
      <Logout />
    </header>
  );
}

export default Header;
