import React from 'react';
import { useBoard } from '@shared/contexts/BoardContext';
import NotificationBoard from '../../Notification/components/NotificationBoard';
import TrendsBoard from '../../Trends/components/TrendsBoard';
import ContributionBoard from '../../Contribution/components/ContributionBoard';
import LanguageBoard from '../../Language/components/LanguageBoard';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';

function Board() {
  const { boardType } = useBoard();

  if (!boardType) {
    return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm text-zinc-500">Select an item to view details</p>
      </div>
    );
  }

  // border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl
  return (
    <div className="min-h-[calc(100vh-12rem)]">
      {boardType === 'notification' && <NotificationBoard />}
      {boardType === 'trends' && <TrendsBoard />}
      {boardType === 'contribution' && <ContributionBoard />}
      {boardType === 'language' && <LanguageBoard />}
    </div>
  );
}

export default Board;
