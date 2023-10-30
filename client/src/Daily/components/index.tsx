import React from 'react';
import { useRecoilValue } from 'recoil';
import Modal from '@shared/components/Modal';
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
    isPrivateRepo,
    setIsPrivateRepo,
  } = useDailyRepoQuery();

  const atomDailyRepoState = useRecoilValue(dailyRepoAtom);

  const handleConfirmClick = () => {
    if (tmpDailyRepoState?.prevRepo) {
      updateAtomRepoState(tmpDailyRepoState.prevRepo);
    }
  };

  if (!atomDailyRepoState.prevRepo) {
    return (
      <>
        <Modal isOpen={isPrivateRepo} onConfirm={() => setIsPrivateRepo(false)}>
          {tmpDailyRepoState?.prevRepo?.name} is a private repository. If you want to access it,
          please{' '}
          <a
            href={`https://github.com/settings/tokens/new?scopes=notifications,user,repo&description=${encodeURIComponent(
              'Token for GitGlances Extension'
            )}`}
            target="_blank"
            className="text-emerald-300"
            rel="noreferrer"
          >
            create a token
          </a>{' '}
          with permission for user, repo, notification.
        </Modal>
        <DailyEmptyCard
          onChange={onChange}
          searchInput={searchInput}
          dailyRepo={tmpDailyRepoState?.prevRepo ?? null}
          onCancel={resetTmpDailyRepoState}
          onConfirm={handleConfirmClick}
        />
      </>
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
