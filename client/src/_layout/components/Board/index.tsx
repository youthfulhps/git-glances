import React from 'react';
import { useBoard } from '@shared/contexts/BoardContext';
import NotificationDetail from './NotificationDetail';
import TrendsDetail from './TrendsDetail';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { SuspenseQuery } from '@suspensive/react-query';
import { trendsRepoListQueryOptions } from '../../../Trends/queries/useTrendsRepoListQuery';

function Board() {
  const { boardType, closeBoard } = useBoard();

  if (!boardType) {
    return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm text-zinc-500">Select an item to view details</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
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
      <SuspenseBoundary>
        {boardType === 'notification' && <NotificationDetail />}
        {boardType === 'trends' && (
          <SuspenseQuery {...trendsRepoListQueryOptions()}>
            {({ data: trendsRepoList }) => <TrendsDetail trendsRepoList={trendsRepoList} />}
          </SuspenseQuery>
        )}
      </SuspenseBoundary>
    </div>
  );
}

export default Board;
