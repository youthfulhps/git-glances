import React from 'react';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';
import { useToken } from '@shared/contexts/TokenContext';
import { GearIcon } from '@primer/octicons-react';

function SettingSummary() {
  const { openSettingBoard } = useBoard();
  const { token } = useToken();
  const isLoggedIn = !!token;

  return (
    <SectionV2 gridArea="Setting" onClick={openSettingBoard}>
      <div className="flex h-full w-full cursor-pointer flex-col justify-center gap-y-2">
        <div className="flex flex-row items-center justify-start gap-x-2">
          <GearIcon size={12} className="text-zinc-400" />
          <div className="text-[10px] text-zinc-400">
            {isLoggedIn ? 'Signed in with GitHub' : 'Not Signed In'}
          </div>
        </div>
      </div>
    </SectionV2>
  );
}

export default SettingSummary;
