import React from 'react';
import Search from '../../../Search/components';

function Header() {
  return (
    <header className="mb-2 flex h-[60px] w-full items-center justify-end rounded-2xl text-zinc-100">
      <Search />
    </header>
  );
}

export default Header;
