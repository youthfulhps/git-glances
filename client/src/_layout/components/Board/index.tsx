import React from 'react';
import { useBoard } from '@shared/contexts/BoardContext';
import SectionV2 from '../SectionV2';
import NotificationDetail from './NotificationDetail';
import TrendsDetail from './TrendsDetail';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';

function Board() {
  const { boardType, closeBoard } = useBoard();

  if (!boardType) {
    return (
      <SectionV2
        hasBackground={false}
        className="h-full rounded-none border-none bg-white/5 backdrop-blur-xl"
      >
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-sm text-zinc-500">Select an item to view details</p>
        </div>
      </SectionV2>
    );
  }

  return (
    <SectionV2
      hasBackground={false}
      className="h-full border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl"
    >
      <div className="flex h-full w-full flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {boardType === 'notification' ? 'Notification Details' : 'Trending Repositories'}
          </h2>
          <button
            onClick={closeBoard}
            className="text-xs text-zinc-400 hover:text-zinc-200"
            aria-label="Close board"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <SuspenseBoundary>
            {boardType === 'notification' && <NotificationDetail />}
            {boardType === 'trends' && <TrendsDetail />}
          </SuspenseBoundary>
        </div>
      </div>
    </SectionV2>
  );
}

export default Board;
