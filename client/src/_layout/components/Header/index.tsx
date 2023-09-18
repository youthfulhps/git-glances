import React from 'react';
import Search from '../../../Search/components';
import Logout from '../../../Logout/components';
import Guide from '../../../Guide/components';
import GoogleApp from '../../../GoogleApp/components';

function Header() {
  return (
    <header className="mb-2 flex h-[60px] w-full items-center justify-between rounded-2xl text-zinc-100">
      <Search />
      <div className="item-center flex">
        <GoogleApp />
        <Guide />
        <div className="mr-2" />
        <Logout />
      </div>
    </header>
  );
}

export default Header;
