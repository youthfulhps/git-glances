import { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mostUsedLanguageQueryOptions } from '../../Language/queries/useMostUsedLanguageQuery';
import { useToken } from './TokenContext';

export type BoardType =
  | 'notification'
  | 'trends'
  | 'contribution'
  | 'language'
  | 'profile'
  | 'starred'
  | 'setting'
  | 'pullrequest'
  | null;
type ActiveBoardType = Exclude<BoardType, null>;

interface BoardContextType {
  boardType: BoardType;
  openBoard: (type: ActiveBoardType) => void;
  openNotificationBoard: () => void;
  openTrendsBoard: () => void;
  openContributionBoard: (date?: string) => void;
  openLanguageBoard: () => void;
  openStarredBoard: () => void;
  openProfileBoard: () => void;
  openSettingBoard: () => void;
  openPullRequestBoard: () => void;
  closeBoard: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedContributionDate: string | null;
  clearContributionDate: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const { token } = useToken();
  const [boardType, setBoardType] = useState<BoardType>(token ? 'profile' : 'setting');
  const [userSelectedLanguage, setUserSelectedLanguage] = useState<string | null>(null);
  const [selectedContributionDate, setSelectedContributionDate] = useState<string | null>(null);

  const { data: mostUsedLanguages } = useQuery(mostUsedLanguageQueryOptions);

  // Update board type when login status changes
  useEffect(() => {
    if (token) {
      // When user logs in, switch to profile board
      setBoardType('profile');
    } else {
      // When user logs out, switch to setting board
      setBoardType('setting');
    }
  }, [token]);

  const defaultLanguage = useMemo(
    () => mostUsedLanguages?.[0]?.name ?? 'JavaScript',
    [mostUsedLanguages],
  );

  const selectedLanguage = userSelectedLanguage ?? defaultLanguage;

  const setSelectedLanguage = useCallback((language: string) => {
    setUserSelectedLanguage(language);
  }, []);

  const openBoard = useCallback((type: ActiveBoardType) => {
    setBoardType(type);
  }, []);

  const openNotificationBoard = useCallback(() => {
    setBoardType('notification');
  }, []);

  const openTrendsBoard = useCallback(() => {
    setBoardType('trends');
  }, []);

  const openContributionBoard = useCallback((date?: string) => {
    setBoardType('contribution');
    setSelectedContributionDate(date || null);
  }, []);

  const openLanguageBoard = useCallback(() => {
    setBoardType('language');
  }, []);

  const openStarredBoard = useCallback(() => {
    setBoardType('starred');
  }, []);

  const openProfileBoard = useCallback(() => {
    setBoardType('profile');
  }, []);

  const openSettingBoard = useCallback(() => {
    setBoardType('setting');
  }, []);

  const openPullRequestBoard = useCallback(() => {
    setBoardType('pullrequest');
  }, []);

  const clearContributionDate = useCallback(() => {
    setSelectedContributionDate(null);
  }, []);

  const closeBoard = useCallback(() => {
    setBoardType(null);
    setSelectedContributionDate(null);
  }, []);

  const value = useMemo(
    () => ({
      boardType,
      openBoard,
      openNotificationBoard,
      openTrendsBoard,
      openContributionBoard,
      openLanguageBoard,
      openStarredBoard,
      openProfileBoard,
      openSettingBoard,
      openPullRequestBoard,
      closeBoard,
      selectedLanguage,
      setSelectedLanguage,
      selectedContributionDate,
      clearContributionDate,
    }),
    [
      boardType,
      openBoard,
      openNotificationBoard,
      openTrendsBoard,
      openContributionBoard,
      openLanguageBoard,
      openStarredBoard,
      openProfileBoard,
      openSettingBoard,
      openPullRequestBoard,
      closeBoard,
      selectedLanguage,
      setSelectedLanguage,
      selectedContributionDate,
      clearContributionDate,
    ],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
