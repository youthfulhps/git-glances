import React from 'react';
import { BellFillIcon } from '@primer/octicons-react';
import SectionV2 from '@layout/components/SectionV2';

function EmptyNotification() {
  return (
    <SectionV2 gridArea="Notification">
      <div className="flex items-center justify-center">
        <BellFillIcon size={12} className="mr-1 fill-emerald-300" />
        <span className="text-sm">Notification is empty</span>
      </div>
      <a
        href="https://github.com/notifications"
        target="_blank"
        rel="noreferrer"
        className="text-xs text-zinc-100 hover:text-zinc-400"
      >
        Go to notification...
      </a>
    </SectionV2>
  );
}

export default EmptyNotification;
