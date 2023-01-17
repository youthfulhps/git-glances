import React from 'react';
import { useRecoilValue } from 'recoil';
import useDailyRepoQuery from '../queries/useDailyRepoQuery';
import DailyEmptyCard from './EmptyDailyCard';
import { dailyRepoAtom } from '../atoms';
import DailyCard from './DailyCard';

function Daily() {
  const {
    resetTmpDailyRepoState,
    tmpDailyRepoState,
    updateAtomRepoState,
    resetDailyRepoState,
    onChange,
    searchInput,
  } = useDailyRepoQuery();

  const atomDailyRepoState = useRecoilValue(dailyRepoAtom);

  const handleConfirmClick = () => {
    if (tmpDailyRepoState?.prevRepo) {
      updateAtomRepoState(tmpDailyRepoState.prevRepo);
    }
  };

  if (!atomDailyRepoState.prevRepo) {
    return (
      <DailyEmptyCard
        onChange={onChange}
        searchInput={searchInput}
        dailyRepo={tmpDailyRepoState?.prevRepo ?? null}
        onCancel={resetTmpDailyRepoState}
        onConfirm={handleConfirmClick}
      />
    );
  }

  return (
    <DailyCard
      dailyRepo={atomDailyRepoState.prevRepo}
      resetDailyRepo={resetDailyRepoState}
      hasTodayContribution={atomDailyRepoState.hasTodayContribution}
    />
  );
}

export default Daily;
