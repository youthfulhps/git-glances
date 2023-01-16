import React from 'react';
import { useRecoilValue } from 'recoil';
import useDailyRepoQuery from '../queries/useDailyRepoQuery';
import DailyEmptyCard from './EmptyDailyCard';
import { dailyRepoAtom } from '../atoms';
import DailyCard from './DailyCard';

function Daily() {
  const {
    resetAtomRepoState,
    dailyRepoState,
    updateAtomRepoState,
    onChange,
    searchInput,
  } = useDailyRepoQuery();

  const atomDailyRepoState = useRecoilValue(dailyRepoAtom);

  const handleConfirmClick = () => {
    if (dailyRepoState.prevRepo) {
      updateAtomRepoState(dailyRepoState.prevRepo);
    }
  };

  if (!atomDailyRepoState.prevRepo) {
    return (
      <DailyEmptyCard
        onChange={onChange}
        searchInput={searchInput}
        dailyRepo={dailyRepoState?.prevRepo ?? null}
        onCancel={resetAtomRepoState}
        onConfirm={handleConfirmClick}
      />
    );
  }

  return (
    <DailyCard
      dailyRepo={atomDailyRepoState.prevRepo}
      hasTodayContribution={atomDailyRepoState.hasTodayContribution}
    />
  );
}

export default Daily;
