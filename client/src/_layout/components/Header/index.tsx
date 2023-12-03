import React from 'react';
import Search from '../../../Search/components';
import Logout from '../../../Logout/components';
import Guide from '../../../Guide/components';
import GoogleApp from '../../../GoogleApp/components';

function Header() {
  return (
    <header className="mb-4 flex h-full w-full flex-col-reverse items-end rounded-2xl text-zinc-100 sm:h-full sm:flex-col-reverse sm:items-end lg:h-[60px] lg:flex-row lg:justify-between">
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
